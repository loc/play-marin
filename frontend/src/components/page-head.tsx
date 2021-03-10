import Head from 'next/head'

export default function PageHead() {
    return (
        <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto+Condensed:wght@700&family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
                rel="stylesheet"
            ></link>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta>
        </Head>
    )
}