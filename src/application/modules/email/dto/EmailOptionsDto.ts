export interface EmailOptionsDto {
    host: string
    port: number
    username: string
    password: string
    from: string
    to: string
    subject?: string
    text?: string
    html?: string
    attachments?: Object[]
}