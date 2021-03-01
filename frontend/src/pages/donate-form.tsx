import { useRouter } from 'next/router';

import Footer from '../components/footer';

export default function DonateForm() {
    const router = useRouter();
    const donationAmount = router.query.hasOwnProperty('amount') ? router.query.amount : 'OTHER';

    return (
        <div>
            <h1>SUPPORT PLAY MARIN</h1>
            <p>How much would you like to donate today?</p>

            <p>You've chosen to donate: ${donationAmount} to Play Marin!</p>

            <Footer />
        </div>
    )
}