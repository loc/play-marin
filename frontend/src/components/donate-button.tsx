import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function DonateButton({className}: {className: string}) {
    const router = useRouter();
    const onDonatePage = router.pathname.match('/donate')?.length > 0;
    const [disabled, setDisabled] = useState(onDonatePage);

    const handleClick = () => {
        router.push('/donate')
    }
    
    return (
        <button className={className} onClick={handleClick} disabled={disabled}>
            Donate
        </button>
    )
}