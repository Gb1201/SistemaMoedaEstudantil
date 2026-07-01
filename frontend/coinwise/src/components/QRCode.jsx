import { useMemo } from "react";
import { qrcode } from "../utils/qrcodeGenerator";

/**
 * QRCode
 * ──────────────────────────────────────────────────────────────────────────
 * Gera um QR Code 100% no front-end, em SVG, a partir de uma string
 * (o código único do cupom que já vem do back-end em `success.cupom` /
 * `res.codigoCupom`). Não depende de nenhuma lib externa nem de rede —
 * usa o encoder vendorizado em `src/utils/qrcodeGenerator.js`.
 *
 * Requisito atendido (Lab05S01): "O cupom deve incluir um QR Code único
 * gerado automaticamente pelo sistema." O dado codificado é único porque
 * o código de cupom em si já é gerado (e garantido único) pelo back-end
 * no momento do resgate — este componente só faz a representação visual.
 *
 * Props:
 *  - value      (string, obrigatório) — o conteúdo a codificar (código do cupom,
 *                ou uma URL de validação tipo `${API}/vantagens/resgates/cupom/${codigo}`)
 *  - size       (number) — lado do QR em px (default 176)
 *  - fgColor    (string) — cor dos módulos (default combina com o tema dark/verde do app)
 *  - bgColor    (string) — cor de fundo (default transparente)
 *  - level      ('L'|'M'|'Q'|'H') — nível de correção de erro (default 'M')
 */
export default function QRCode({
  value,
  size = 176,
  fgColor = "#0a1f14",
  bgColor = "#f0fdf4",
  level = "M",
}) {
  const modules = useMemo(() => {
    if (!value) return null;
    try {
      // typeNumber = 0 → a lib escolhe automaticamente a menor versão
      // de QR que comporta o conteúdo.
      const qr = qrcode(0, level);
      qr.addData(String(value));
      qr.make();

      const count = qr.getModuleCount();
      const cells = [];
      for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
          if (qr.isDark(row, col)) cells.push([row, col]);
        }
      }
      return { count, cells };
    } catch (err) {
      console.error("Falha ao gerar QR Code:", err);
      return null;
    }
  }, [value, level]);

  if (!modules) return null;

  const { count, cells } = modules;
  // margem (quiet zone) de 2 módulos, recomendado p/ leitura confiável
  const quietZone = 2;
  const totalModules = count + quietZone * 2;
  const moduleSize = size / totalModules;

  return (
    <svg
      viewBox={`0 0 ${totalModules} ${totalModules}`}
      width={size}
      height={size}
      role="img"
      aria-label={`QR Code do cupom ${value}`}
      shapeRendering="crispEdges"
      style={{ display: "block", borderRadius: "0.6rem", overflow: "hidden" }}
    >
      <rect x={0} y={0} width={totalModules} height={totalModules} fill={bgColor} />
      {cells.map(([row, col]) => (
        <rect
          key={`${row}-${col}`}
          x={col + quietZone}
          y={row + quietZone}
          width={1}
          height={1}
          fill={fgColor}
        />
      ))}
    </svg>
  );
}