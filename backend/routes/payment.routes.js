import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { piAuth } from '../middleware/piAuth.js';
import { createPayment, submitPayment, completePayment, getPayment } from '../services/piPayments.js';
import { logger } from '../logger.js';

const router = Router();
const createSchema = z.object({ orderId: z.string().uuid() });
const submitSchema = z.object({ orderId: z.string().uuid(), pending_payments: z.boolean().optional() });

router.post('/create', piAuth, async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  try {
    const order = await prisma.order.findUnique({
      where: { id: parsed.data.orderId },
      include: { product: true, buyer: true }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.status !== 'pending') return res.status(400).json({ error: 'Order not pending' });

    const paymentId = await createPayment({
      amount: order.product.pricePi,
      memo: `Order ${order.id} - ${order.product.name}`,
      metadata: { orderId: order.id, productId: order.productId },
      uid: order.buyer.uid
    });

    await prisma.order.update({ where: { id: order.id }, data: { paymentId } });
    res.json({ paymentId });
  } catch (err) {
    logger.error({ err }, 'Failed to create payment');
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

router.post('/submit', piAuth, async (req, res) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  try {
    const order = await prisma.order.findUnique({ where: { id: parsed.data.orderId } });
    if (!order?.paymentId) return res.status(400).json({ error: 'Missing paymentId' });

    const txid = await submitPayment(order.paymentId, parsed.data.pending_payments ?? false);
    await prisma.order.update({ where: { id: order.id }, data: { txid } });
    res.json({ txid });
  } catch (err) {
    logger.error({ err }, 'Failed to submit payment');
    res.status(500).json({ error: 'Failed to submit payment' });
  }
});

router.post('/complete', piAuth, async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  try {
    const order = await prisma.order.findUnique({ where: { id: parsed.data.orderId } });
    if (!order?.paymentId || !order?.txid) return res.status(400).json({ error: 'Missing payment or txid' });

    const result = await completePayment(order.paymentId, order.txid);
    await prisma.order.update({ where: { id: order.id }, data: { status: 'completed' } });
    res.json({ status: 'completed', pi_result: result });
  } catch (err) {
    logger.error({ err }, 'Failed to complete payment');
    res.status(500).json({ error: 'Failed to complete payment' });
  }
});

router.get('/:paymentId', piAuth, async (req, res) => {
  try {
    const data = await getPayment(req.params.paymentId);
    res.json(data);
  } catch (err) {
    logger.error({ err }, 'Failed to fetch payment from Pi');
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

export default router;
