import { NextResponse } from 'next/server'

export async function POST(req) {
    const docusealData = await req.json()
    const data = await fetch(`https://api.docuseal.co/submissions`, {
        method: 'POST',
        body: JSON.stringify({
            template_id: docusealData.id,
            order: 'preserved',
            send_email: false,
            fields: docusealData.fields,
            submitters: [
                {
                    email: docusealData.email,
                    role: 'Employee',
                },
            ],
        }),
        headers: {
            'X-Auth-Token': process.env.NEXT_PUBLIC_DOCUSEAL_KEY,
            'Content-Type': 'application/json',
        },
    })

    const responseData = await data.json()

    return NextResponse.json(responseData)
}
