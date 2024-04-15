import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto, { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// Testes Automatizados: 3 tipos;
// Testes unitários (testam uma unidade da sua aplicação, uma parte apenas)
// Testes integrados (testam a comunicação entre duas ou mais unidades)
// e2e - ponto a ponto (simulam um usuário operando na aplicação).

export async function transactionsRoutes(app: FastifyInstance) {
  // Listing all the transactions
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies
    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return { transactions }
  })
  // Listing one transaction only by id
  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
    // This z.object is used to make a type for the data and the typescript identify the data
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)

    const { sessionId } = request.cookies

    const transaction = await knex('transactions')
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return { transaction }
  })
  app.get('/summary', async (request) => {
    const { sessionId } = request.cookies

    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })
  // Creating a transaction
  app.post('/', async (request, reply) => {
    // This z.object is used to make a type for the data and the typescript identify the data
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
