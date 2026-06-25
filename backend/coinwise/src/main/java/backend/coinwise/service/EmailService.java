package backend.coinwise.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import backend.coinwise.dtos.EmailResgateMessage;
import backend.coinwise.dtos.EmailTransacaoMessage;
import backend.coinwise.model.Resgate;
import backend.coinwise.model.Transacao;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // ─── Utilitário interno ───────────────────────────────────────────────────

    private void enviarHtml(String para, String assunto, String html) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("onboarding@resend.dev"); // ← adicionar essa linha
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(html, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail para " + para + ": " + e.getMessage());
        }
    }

    private static String base(String conteudo) {
        return """
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@600&display=swap');
                * { margin:0; padding:0; box-sizing:border-box; }
                body { background:#0d1117; font-family:'DM Sans',sans-serif; color:#e2e8f0; padding:40px 16px; }
                .wrapper { max-width:560px; margin:0 auto; }
                .header { background:linear-gradient(135deg,#1a2236 0%,#0f1923 100%); border-radius:16px 16px 0 0; padding:32px 40px 28px; border-bottom:3px solid #f5c518; text-align:center; }
                .logo-row { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:4px; }
                .logo-icon { width:36px; height:36px; background:#f5c518; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; font-size:18px; }
                .logo-text { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:#fff; letter-spacing:-0.5px; }
                .logo-sub { font-size:10px; font-weight:500; color:#f5c518; letter-spacing:2px; text-transform:uppercase; }
                .badge { margin-top:16px; display:inline-block; background:rgba(245,197,24,.12); border:1px solid rgba(245,197,24,.3); color:#f5c518; font-size:11px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; padding:5px 14px; border-radius:20px; }
                .body { background:#111827; padding:36px 40px; }
                .greeting { font-family:'Syne',sans-serif; font-size:24px; font-weight:700; color:#fff; margin-bottom:8px; }
                .subtitle { color:#94a3b8; font-size:15px; margin-bottom:32px; line-height:1.5; }
                .card { background:#1a2236; border:1px solid #2d3748; border-radius:12px; padding:24px; margin-bottom:16px; }
                .card-label { font-size:11px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; color:#f5c518; margin-bottom:16px; }
                .row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #2d3748; }
                .row:last-child { border-bottom:none; }
                .rk { font-size:13px; color:#94a3b8; }
                .rv { font-size:14px; font-weight:500; color:#e2e8f0; text-align:right; max-width:60%; }
                .rv.gold { color:#f5c518; font-family:'Syne',sans-serif; font-size:18px; font-weight:700; }
                .rv.mono { font-family:'JetBrains Mono',monospace; font-size:13px; color:#64748b; }
                .pill { background:linear-gradient(135deg,#f5c518 0%,#e6a800 100%); border-radius:10px; padding:16px 24px; display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
                .pill-label { font-size:13px; color:#1a1a00; font-weight:500; }
                .pill-value { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:#1a1a00; }
                .coin-hero { text-align:center; background:linear-gradient(135deg,#1f2d1a 0%,#1a2a14 100%); border:1px solid rgba(74,222,128,.25); border-radius:12px; padding:28px; margin-bottom:24px; }
                .coin-amount { font-family:'Syne',sans-serif; font-size:52px; font-weight:800; color:#4ade80; line-height:1; }
                .coin-label { font-size:13px; color:#86efac; margin-top:4px; letter-spacing:1px; text-transform:uppercase; }
                .coin-from { margin-top:14px; font-size:14px; color:#94a3b8; }
                .coin-from strong { color:#e2e8f0; }
                .coupon { border:2px dashed rgba(245,197,24,.4); border-radius:16px; overflow:hidden; margin-bottom:24px; }
                .coupon-header { background:linear-gradient(135deg,#f5c518 0%,#e6a800 100%); padding:20px 24px; display:flex; justify-content:space-between; align-items:center; }
                .coupon-header-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:#1a1a00; letter-spacing:1px; text-transform:uppercase; }
                .coupon-body { background:#1a2236; padding:24px; }
                .coupon-name { font-family:'Syne',sans-serif; font-size:20px; font-weight:700; color:#fff; margin-bottom:4px; }
                .coupon-empresa { font-size:14px; color:#94a3b8; margin-bottom:20px; }
                .coupon-code-section { background:#0f1923; padding:20px 24px; text-align:center; }
                .code-label { font-size:11px; color:#94a3b8; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:10px; }
                .code { font-family:'JetBrains Mono',monospace; font-size:26px; font-weight:600; color:#f5c518; letter-spacing:4px; background:rgba(245,197,24,.08); border:1px solid rgba(245,197,24,.2); border-radius:8px; padding:12px 20px; display:inline-block; }
                .info-box { background:rgba(245,197,24,.06); border:1px solid rgba(245,197,24,.15); border-radius:10px; padding:16px 20px; margin-bottom:24px; font-size:13px; color:#94a3b8; line-height:1.6; }
                .info-box strong { color:#f5c518; }
                .warn-box { background:rgba(251,191,36,.06); border-left:3px solid #f5c518; border-radius:0 8px 8px 0; padding:14px 18px; margin-bottom:28px; font-size:13px; color:#94a3b8; line-height:1.6; }
                .warn-box strong { color:#fbbf24; }
                .desc-card { background:#1a2236; border:1px solid #2d3748; border-radius:12px; padding:20px 24px; margin-bottom:28px; }
                .desc-label { font-size:11px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; color:#f5c518; margin-bottom:10px; }
                .desc-text { font-size:14px; color:#94a3b8; line-height:1.6; }
                .footer { background:#0d1117; border-top:1px solid #1e2a3a; border-radius:0 0 16px 16px; padding:24px 40px; text-align:center; }
                .footer p { font-size:12px; color:#4a5568; line-height:1.6; }
                .footer strong { color:#718096; }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="header">
                  <div class="logo-row">
                    <div class="logo-icon">&#9670;</div>
                    <div>
                      <div class="logo-text">CoinClass</div>
                      <div class="logo-sub">Moeda Estudantil</div>
                    </div>
                  </div>
                </div>
                {CONTEUDO}
                <div class="footer">
                  <p><strong>CoinClass &ndash; Sistema de Moeda Estudantil</strong><br/>
                  Este &eacute; um e-mail autom&aacute;tico, por favor n&atilde;o responda.</p>
                </div>
              </div>
            </body>
            </html>
            """.replace("{CONTEUDO}", conteudo);
    }

    // ─── Transações (via entidade JPA) ────────────────────────────────────────

    public void enviarEmailProfessor(Transacao transacao) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Ol&aacute;, %s!</p>
              <p class="subtitle">Sua transfer&ecirc;ncia foi realizada com sucesso.</p>
              <div class="card">
                <div class="card-label">Detalhes da Transa&ccedil;&atilde;o</div>
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Aluno beneficiado:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Moedas enviadas:</td>
                    <td style="font-size:18px;font-weight:700;color:#f5c518;text-align:right;padding:10px 0;">%s moedas</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Motivo:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <table width="100%%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#f5c518 0%%,#e6a800 100%%);border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 24px;font-size:13px;color:#1a1a00;font-weight:500;">Seu saldo atual:</td>
                  <td style="padding:16px 24px;font-size:20px;font-weight:800;color:#1a1a00;text-align:right;">%s moedas</td>
                </tr>
              </table>
            </div>
            """.formatted(
                transacao.getProfessor().getNome(),
                transacao.getAluno().getNome(),
                transacao.getValor(),
                transacao.getMotivo(),
                transacao.getProfessor().getSaldo()
            );

        enviarHtml(
            transacao.getProfessor().getEmail(),
            "CoinClass \u2013 Confirma\u00e7\u00e3o de envio de moedas",
            base(conteudo)
        );
    }

    public void enviarEmailAluno(Transacao transacao) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Ol&aacute;, %s!</p>
              <p class="subtitle">Um professor reconheceu seu m&eacute;rito. Parab&eacute;ns!</p>
              <div class="coin-hero">
                <div class="coin-amount">+%s</div>
                <div class="coin-label">moedas recebidas</div>
                <div class="coin-from">enviadas por <strong>%s</strong></div>
              </div>
              <div class="card">
                <div class="card-label">Detalhes</div>
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Motivo:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <table width="100%%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#f5c518 0%%,#e6a800 100%%);border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 24px;font-size:13px;color:#1a1a00;font-weight:500;">Seu saldo atual:</td>
                  <td style="padding:16px 24px;font-size:20px;font-weight:800;color:#1a1a00;text-align:right;">%s moedas</td>
                </tr>
              </table>
            </div>
            """.formatted(
                transacao.getAluno().getNome(),
                transacao.getValor(),
                transacao.getProfessor().getNome(),
                transacao.getMotivo(),
                transacao.getAluno().getSaldo()
            );

        enviarHtml(
            transacao.getAluno().getEmail(),
            "CoinClass \u2013 Voc\u00ea recebeu moedas!",
            base(conteudo)
        );
    }

    // ─── Resgates (via entidade JPA) ──────────────────────────────────────────

    public void enviarEmailCupomAluno(Resgate resgate) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Parab&eacute;ns, %s!</p>
              <p class="subtitle">Seu resgate foi confirmado. Guarde o c&oacute;digo abaixo.</p>
              <div class="coupon">
                <div class="coupon-header">
                  <span class="coupon-header-title">Cupom de Resgate</span>
                  <span style="font-size:24px">&#127903;</span>
                </div>
                <div class="coupon-body">
                  <div class="coupon-name">%s</div>
                  <div class="coupon-empresa">%s</div>
                  <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                    <tr style="border-bottom:1px solid #2d3748;">
                      <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Custo:</td>
                      <td style="font-size:18px;font-weight:700;color:#f5c518;text-align:right;padding:10px 0;">%s moedas</td>
                    </tr>
                    <tr>
                      <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Data do resgate:</td>
                      <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                    </tr>
                  </table>
                </div>
                <div class="coupon-code-section">
                  <div class="code-label">C&oacute;digo do cupom</div>
                  <div class="code">%s</div>
                </div>
              </div>
              <div class="info-box">
                <strong>Como usar:</strong> Apresente este c&oacute;digo presencialmente na empresa parceira.
                O atendente ir&aacute; validar o c&oacute;digo e liberar sua vantagem.
              </div>
              <div class="desc-card">
                <div class="desc-label">Descri&ccedil;&atilde;o da vantagem</div>
                <div class="desc-text">%s</div>
              </div>
            </div>
            """.formatted(
                resgate.getAluno().getNome(),
                resgate.getVantagem().getNome(),
                resgate.getVantagem().getEmpresa().getNome(),
                resgate.getValorDescontado(),
                resgate.getDataResgate(),
                resgate.getCodigoCupom(),
                resgate.getVantagem().getDescricao()
            );

        enviarHtml(
            resgate.getAluno().getEmail(),
            "CoinClass \u2013 Seu cupom: " + resgate.getVantagem().getNome(),
            base(conteudo)
        );
    }

    public void enviarEmailConferenciaEmpresa(Resgate resgate) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Ol&aacute;, %s!</p>
              <p class="subtitle">Um aluno resgatou uma vantagem da sua empresa. Confira os dados antes de liberar o benef&iacute;cio.</p>
              <div class="card-label" style="margin-bottom:12px">Dados do aluno</div>
              <div class="card">
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Nome:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">E-mail:</td>
                    <td style="font-size:13px;font-family:monospace;color:#64748b;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">RA:</td>
                    <td style="font-size:13px;font-family:monospace;color:#64748b;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <div class="card-label" style="margin-bottom:12px;margin-top:16px">Dados do resgate</div>
              <div class="card">
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Vantagem:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Custo:</td>
                    <td style="font-size:18px;font-weight:700;color:#f5c518;text-align:right;padding:10px 0;">%s moedas</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Data:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <div class="coupon-code-section" style="border-radius:12px;margin-bottom:16px">
                <div class="code-label">C&oacute;digo de valida&ccedil;&atilde;o do cupom</div>
                <div class="code">%s</div>
              </div>
              <div class="warn-box">
                <strong>Aten&ccedil;&atilde;o:</strong> Confirme que o c&oacute;digo apresentado pelo aluno corresponde ao c&oacute;digo acima
                e que os dados de identifica&ccedil;&atilde;o conferem antes de liberar a vantagem.
              </div>
            </div>
            """.formatted(
                resgate.getVantagem().getEmpresa().getNome(),
                resgate.getAluno().getNome(),
                resgate.getAluno().getEmail(),
                resgate.getAluno().getRa(),
                resgate.getVantagem().getNome(),
                resgate.getValorDescontado(),
                resgate.getDataResgate(),
                resgate.getCodigoCupom()
            );

        enviarHtml(
            resgate.getVantagem().getEmpresa().getEmail(),
            "CoinClass \u2013 Novo resgate: " + resgate.getVantagem().getNome(),
            base(conteudo)
        );
    }

    // ─── Transações (via RabbitMQ — recebe DTO, sem JPA) ─────────────────────

    public void enviarEmailProfessor(EmailTransacaoMessage msg) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Ol&aacute;, %s!</p>
              <p class="subtitle">Sua transfer&ecirc;ncia foi realizada com sucesso.</p>
              <div class="card">
                <div class="card-label">Detalhes da Transa&ccedil;&atilde;o</div>
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Aluno beneficiado:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Moedas enviadas:</td>
                    <td style="font-size:18px;font-weight:700;color:#f5c518;text-align:right;padding:10px 0;">%s moedas</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Motivo:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <table width="100%%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#f5c518 0%%,#e6a800 100%%);border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 24px;font-size:13px;color:#1a1a00;font-weight:500;">Seu saldo atual:</td>
                  <td style="padding:16px 24px;font-size:20px;font-weight:800;color:#1a1a00;text-align:right;">%s moedas</td>
                </tr>
              </table>
            </div>
            """.formatted(
                msg.nomeProfessor(),
                msg.nomeAluno(),
                msg.valor(),
                msg.motivo(),
                msg.saldoProfessor()
            );

        enviarHtml(
            msg.emailProfessor(),
            "CoinClass \u2013 Confirma\u00e7\u00e3o de envio de moedas",
            base(conteudo)
        );
    }

    public void enviarEmailAluno(EmailTransacaoMessage msg) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Ol&aacute;, %s!</p>
              <p class="subtitle">Um professor reconheceu seu m&eacute;rito. Parab&eacute;ns!</p>
              <div class="coin-hero">
                <div class="coin-amount">+%s</div>
                <div class="coin-label">moedas recebidas</div>
                <div class="coin-from">enviadas por <strong>%s</strong></div>
              </div>
              <div class="card">
                <div class="card-label">Detalhes</div>
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Motivo:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <table width="100%%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#f5c518 0%%,#e6a800 100%%);border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 24px;font-size:13px;color:#1a1a00;font-weight:500;">Seu saldo atual:</td>
                  <td style="padding:16px 24px;font-size:20px;font-weight:800;color:#1a1a00;text-align:right;">%s moedas</td>
                </tr>
              </table>
            </div>
            """.formatted(
                msg.nomeAluno(),
                msg.valor(),
                msg.nomeProfessor(),
                msg.motivo(),
                msg.saldoAluno()
            );

        enviarHtml(
            msg.emailAluno(),
            "CoinClass \u2013 Voc\u00ea recebeu moedas!",
            base(conteudo)
        );
    }

    // ─── Resgates (via RabbitMQ — recebe DTO, sem JPA) ───────────────────────

    public void enviarEmailCupomAluno(EmailResgateMessage msg) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Parab&eacute;ns, %s!</p>
              <p class="subtitle">Seu resgate foi confirmado. Guarde o c&oacute;digo abaixo.</p>
              <div class="coupon">
                <div class="coupon-header">
                  <span class="coupon-header-title">Cupom de Resgate</span>
                  <span style="font-size:24px">&#127903;</span>
                </div>
                <div class="coupon-body">
                  <div class="coupon-name">%s</div>
                  <div class="coupon-empresa">%s</div>
                  <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                    <tr style="border-bottom:1px solid #2d3748;">
                      <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Custo:</td>
                      <td style="font-size:18px;font-weight:700;color:#f5c518;text-align:right;padding:10px 0;">%s moedas</td>
                    </tr>
                    <tr>
                      <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Data do resgate:</td>
                      <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                    </tr>
                  </table>
                </div>
                <div class="coupon-code-section">
                  <div class="code-label">C&oacute;digo do cupom</div>
                  <div class="code">%s</div>
                </div>
              </div>
              <div class="info-box">
                <strong>Como usar:</strong> Apresente este c&oacute;digo presencialmente na empresa parceira.
                O atendente ir&aacute; validar o c&oacute;digo e liberar sua vantagem.
              </div>
              <div class="desc-card">
                <div class="desc-label">Descri&ccedil;&atilde;o da vantagem</div>
                <div class="desc-text">%s</div>
              </div>
            </div>
            """.formatted(
                msg.nomeAluno(),
                msg.nomeVantagem(),
                msg.nomeEmpresa(),
                msg.valorDescontado(),
                msg.dataResgate(),
                msg.codigoCupom(),
                msg.descVantagem()
            );

        enviarHtml(
            msg.emailAluno(),
            "CoinClass \u2013 Seu cupom: " + msg.nomeVantagem(),
            base(conteudo)
        );
    }

    public void enviarEmailConferenciaEmpresa(EmailResgateMessage msg) {
        String conteudo = """
            <div class="body">
              <p class="greeting">Ol&aacute;, %s!</p>
              <p class="subtitle">Um aluno resgatou uma vantagem da sua empresa. Confira os dados antes de liberar o benef&iacute;cio.</p>
              <div class="card-label" style="margin-bottom:12px">Dados do aluno</div>
              <div class="card">
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Nome:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">E-mail:</td>
                    <td style="font-size:13px;font-family:monospace;color:#64748b;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">RA:</td>
                    <td style="font-size:13px;font-family:monospace;color:#64748b;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <div class="card-label" style="margin-bottom:12px;margin-top:16px">Dados do resgate</div>
              <div class="card">
                <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Vantagem:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                  <tr style="border-bottom:1px solid #2d3748;">
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Custo:</td>
                    <td style="font-size:18px;font-weight:700;color:#f5c518;text-align:right;padding:10px 0;">%s moedas</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#94a3b8;padding:10px 0;">Data:</td>
                    <td style="font-size:14px;font-weight:500;color:#e2e8f0;text-align:right;padding:10px 0;">%s</td>
                  </tr>
                </table>
              </div>
              <div class="coupon-code-section" style="border-radius:12px;margin-bottom:16px">
                <div class="code-label">C&oacute;digo de valida&ccedil;&atilde;o do cupom</div>
                <div class="code">%s</div>
              </div>
              <div class="warn-box">
                <strong>Aten&ccedil;&atilde;o:</strong> Confirme que o c&oacute;digo apresentado pelo aluno corresponde ao c&oacute;digo acima
                e que os dados de identifica&ccedil;&atilde;o conferem antes de liberar a vantagem.
              </div>
            </div>
            """.formatted(
                msg.nomeEmpresa(),
                msg.nomeAluno(),
                msg.emailAluno(),
                msg.raAluno(),
                msg.nomeVantagem(),
                msg.valorDescontado(),
                msg.dataResgate(),
                msg.codigoCupom()
            );

        enviarHtml(
            msg.emailEmpresa(),
            "CoinClass \u2013 Novo resgate: " + msg.nomeVantagem(),
            base(conteudo)
        );
    }
}