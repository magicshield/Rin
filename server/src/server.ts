import cors from '@elysiajs/cors';
import { serverTiming } from '@elysiajs/server-timing';
import { Elysia } from 'elysia';
import { FeedService } from './services/feed';
import { TagService } from './services/tag';
import { UserService } from './services/user';
import { logPlugin, logger } from './utils/logger';

export const app = new Elysia()
    .use(cors({
        aot: true,
        origin: '*',
        methods: '*',
        allowedHeaders: [
            'Authorization',
            'content-type'
        ],
        maxAge: 600,
        credentials: true,
        preflight: true
    }))
    .use(serverTiming({
        enabled: true,
    }))
    .use(logPlugin)
    .use(UserService)
    .use(FeedService)
    .use(TagService)
    .get('/', ({ uid }) => `Hi ${uid}`)
    .onError(({ path, params, code }) => {
        if (code === 'NOT_FOUND')
            return `${path} ${JSON.stringify(params)} not found`
    })
    .listen(process.env.PORT ?? 3001, () => {
        if (process.env.NODE_ENV != 'test')
            logger.info(`[Rim] Server is running on port ${process.env.PORT ?? 3001}`)
    })

export type App = typeof app