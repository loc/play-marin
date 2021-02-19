import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DonateForm() {
    const router = useRouter();
    const donationAmount = router.query.hasOwnProperty('amount') ? router.query.amount : 'OTHER';

    return (
        <div>
            <h1>Donate Form</h1>
            <p>You've chosen to donate: {donationAmount} to Play Marin!</p>
            <Link href='/donate'>
                <a>back to Donate page!</a>
            </Link>
        </div>
    )
}