import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { fileNames, totalPrice, copies, paperTypes, coverTypes, contact } = await req.json();

    const BOT_TOKEN = "8342165659:AAHi4E87PG9r2BWoEMR900NyiYb3aF5UzfY";
    const CHAT_IDS = [
      5480257326,
      980605046,
      8193994750, // This one was missing in the user's last message, assuming it should be kept
      6846125638
    ];

    let booksDetails = '';
    for (let i = 0; i < fileNames.length; i++) {
      booksDetails += `
📖 <b>Kitob ${i + 1}:</b> ${fileNames[i]}
  - Nusxalar soni: ${copies[i]}
  - Qog'oz turi: ${paperTypes[i]}
  - Muqova turi: ${coverTypes[i]}
`;
    }

    const message = `
📦 <b>YANGI BUYURTMA KELDI!</b>
${booksDetails}
💰 <b>Umumiy narx:</b> ${totalPrice.toLocaleString('ru-RU')} so'm
📱 <b>Mijoz:</b> @${contact}

🕒 Sana: ${new Date().toLocaleString('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}

<i>Tezda javob bering! 🔥</i>
`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const requests = CHAT_IDS.map(chatId =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }).then(res => res.json())
    );

    const results = await Promise.all(requests);

    const failed = results.find(r => !r.ok);
    if (failed) {
      console.error('Telegram error:', results);
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
