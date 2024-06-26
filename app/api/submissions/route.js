import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const submissions_id = searchParams.get('submission_id')
        const data = await fetch(
            `https://api.docuseal.co/submissions/${submissions_id}`,
            {
                method: 'GET',
                headers: {
                    'X-Auth-Token': process.env.NEXT_PUBLIC_DOCUSEAL_KEY,
                },
            }
        )

        if (!data.ok) {
            throw new Error(`HTTP error! status: ${data.status}`)
        }

        const responseData = await data.json()
        return NextResponse.json(responseData)
    } catch (error) {
        console.error('Failed to fetch submission:', error)
        return new NextResponse('Error fetching submission', { status: 500 })
    }
}
