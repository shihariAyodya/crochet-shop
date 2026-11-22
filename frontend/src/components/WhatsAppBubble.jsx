'use client';

import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { ORDER_WHATSAPP_NUMBER } from '../lib/site';
import './WhatsAppBubble.css';

const WA_MESSAGE = 'Hi Shizelle! I have a question.';

function WhatsAppBubble() {
    const pathname = usePathname();

    // Don't show it on the admin page
    if (pathname?.startsWith('/admin')) return null;

    return (
        <a
            href={`https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-bubble"
            aria-label="Chat with us on WhatsApp"
        >
            <span className="wa-bubble-label">Chat with us</span>
            <span className="wa-bubble-icon">
                <FaWhatsapp />
            </span>
        </a>
    );
}

export default WhatsAppBubble;