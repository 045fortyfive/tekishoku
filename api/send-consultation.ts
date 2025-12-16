import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, mbtiType, message } = req.body;

    // バリデーション
    if (!name || !email) {
      return res.status(400).json({ error: '名前とメールアドレスは必須です' });
    }

    // メール送信設定
    // 環境変数からSMTP設定を取得
    // SMTP_PASSWORDとSMTP_PASSの両方に対応
    const smtpPassword = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || '';
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || '';
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports (587)
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      // Office365用の追加設定
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false, // 証明書検証を無効化（必要に応じて）
      },
    });

    // 送信元メールアドレス（MAIL_FROMがあれば使用、なければSMTP_USERを使用）
    const fromAddress = process.env.MAIL_FROM || smtpUser || 'noreply@tekishoku.vercel.app';

    // メール内容
    const mailOptions = {
      from: fromAddress,
      to: email, // 申込者のメールアドレス
      bcc: 'info@hugan.co.jp', // Bccにinfo@hugan.co.jpを設定
      subject: `【適職診断】面談申込 - ${name}様`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            面談申込を受け付けました
          </h2>
          
          <p>${name}様</p>
          
          <p>この度は、適職診断サービスにご申込いただき、誠にありがとうございます。</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">申込内容</h3>
            <p><strong>お名前:</strong> ${name}</p>
            <p><strong>メールアドレス:</strong> ${email}</p>
            ${phone ? `<p><strong>電話番号:</strong> ${phone}</p>` : ''}
            <p><strong>MBTIタイプ:</strong> ${mbtiType || '未設定'}</p>
            ${message ? `<p><strong>ご質問・ご要望:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
          </div>
          
          <p>担当者より、3営業日以内にご連絡させていただきます。</p>
          
          <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px;">
            このメールは自動送信されています。<br>
            本メールに心当たりがない場合は、お手数ですが破棄してください。
          </p>
        </div>
      `,
      text: `
面談申込を受け付けました

${name}様

この度は、適職診断サービスにご申込いただき、誠にありがとうございます。

申込内容:
- お名前: ${name}
- メールアドレス: ${email}
${phone ? `- 電話番号: ${phone}` : ''}
- MBTIタイプ: ${mbtiType || '未設定'}
${message ? `- ご質問・ご要望: ${message}` : ''}

担当者より、3営業日以内にご連絡させていただきます。

ご不明な点がございましたら、お気軽にお問い合わせください。
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: '申込を受け付けました。確認メールを送信しました。' 
    });
  } catch (error: any) {
    console.error('メール送信エラー:', error);
    return res.status(500).json({ 
      error: 'メール送信に失敗しました。しばらくしてから再度お試しください。',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

