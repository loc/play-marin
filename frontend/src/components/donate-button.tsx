import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function DonateButton({className}: {className: string}) {
    const router = useRouter();
    const buttonClass = [buttonStyles.primary, className].join(' ');

    const handleClick = (e) => {
        e.preventDefault()
        router.push('/donate')
    }
    
    return (
        <button className={buttonClass} onClick={handleClick}>
            Donate
        </button>
    )
    }