import { useApp } from '../context/AppContext';
import './ShareExport.css';

export default function ShareExport({ onClose }) {
    const { currentList, preferences } = useApp();

    const generateText = () => {
        if (currentList.length === 0) return 'Shopping list is empty.';

        if (preferences.mode === 'kirana') {
            let text = '🛒 *Shopping List*\n\n';
            currentList.forEach((item, i) => {
                text += `${i + 1}. ${item.name} - ${item.quantity} ${item.unit}\n`;
            });
            return text;
        }

        let text = '🛒 *Shopping List*\n\n';
        const grouped = {};
        currentList.forEach(item => {
            const key = item.categoryName || 'Other';
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item);
        });

        Object.entries(grouped).forEach(([cat, items]) => {
            text += `📌 *${cat}*\n`;
            items.forEach(item => {
                text += `  • ${item.name} — ${item.quantity} ${item.unit}\n`;
            });
            text += '\n';
        });

        return text;
    };

    const handleCopy = async () => {
        const text = generateText();
        try {
            await navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            alert('Copied to clipboard!');
        }
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(generateText());
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const handlePDF = async () => {
        try {
            const { default: jsPDF } = await import('jspdf');
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text('Shopping List', 20, 20);
            doc.setFontSize(10);
            doc.text(new Date().toLocaleDateString('en-IN', { dateStyle: 'long' }), 20, 28);

            let y = 40;

            if (preferences.mode === 'kirana') {
                doc.setFontSize(11);
                currentList.forEach((item, i) => {
                    if (y > 270) { doc.addPage(); y = 20; }
                    doc.text(`${i + 1}. ${item.name} - ${item.quantity} ${item.unit}`, 20, y);
                    y += 7;
                });
            } else {
                const grouped = {};
                currentList.forEach(item => {
                    const key = item.categoryName || 'Other';
                    if (!grouped[key]) grouped[key] = [];
                    grouped[key].push(item);
                });

                Object.entries(grouped).forEach(([cat, items]) => {
                    if (y > 255) { doc.addPage(); y = 20; }
                    doc.setFontSize(13);
                    doc.setFont(undefined, 'bold');
                    doc.text(cat, 20, y);
                    y += 8;

                    doc.setFontSize(11);
                    doc.setFont(undefined, 'normal');
                    items.forEach(item => {
                        if (y > 270) { doc.addPage(); y = 20; }
                        doc.text(`  • ${item.name} — ${item.quantity} ${item.unit}`, 22, y);
                        y += 7;
                    });
                    y += 4;
                });
            }

            doc.save('shopping-list.pdf');
        } catch (err) {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="share-overlay" onClick={onClose}>
            <div className="share-sheet animate-slide-up" onClick={e => e.stopPropagation()}>
                <h3 className="share-title">Share & Export</h3>
                <p className="share-subtitle">{currentList.length} items in your list</p>

                <div className="share-preview">
                    <pre>{generateText()}</pre>
                </div>

                <div className="share-actions">
                    <button className="share-btn copy" onClick={handleCopy}>
                        <span>📋</span>
                        <span>Copy Text</span>
                    </button>
                    <button className="share-btn whatsapp" onClick={handleWhatsApp}>
                        <span>💬</span>
                        <span>WhatsApp</span>
                    </button>
                    <button className="share-btn pdf" onClick={handlePDF}>
                        <span>📄</span>
                        <span>PDF</span>
                    </button>
                </div>

                <button className="share-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
