import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { fileName, totalPrice, copies, paperType, coverType, contact } = await req.json();

    const BOT_TOKEN = "8389409822:AAH4u330AtuyQEUe7oRpHinULyby6KgrsQw"; // Add your bot token to your environment variables
    const CHAT_ID = 6846125638; // Add your chat ID to your environment variables

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Bot token or chat ID not provided');
      return NextResponse.json({ success: false, error: 'Internal server error' });
    }

    const message = `
📦 <b>YANGI BUYURTMA KELDI!</b>

💰 <b>Umumiy narx:</b> ${totalPrice.toLocaleString('ru-RU')} so'm
📚 <b>Nusxalar soni:</b> ${copies} ta
📄 <b>Qog'oz turi:</b> ${paperType}
🖼️ <b>Muqova turi:</b> ${coverType}
📱 <b>Mijoz :</b> @${contact}

🕒 Sana: ${new Date().toLocaleString('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

<i>Tezda javob bering! 🔥</i>
`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const params = {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML' as const
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Error sending message to Telegram:', data);
      return NextResponse.json({ success: false, error: 'Failed to send message' });
    }
  } catch (error) {
    console.error('Error sending order:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
