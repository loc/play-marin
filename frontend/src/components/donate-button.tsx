import React, { useState } from 'react';

export default function DonateButton({className}: {className: string}) {
    const buttonClass = [buttonStyles.primary, className].join(' ');
    
    return (
        <button className={buttonClass}>
            Donate
        </button>
    )
    }