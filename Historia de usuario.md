**Historia de usuario**

Como um aluno com saldo acumulado, eu quero trocar minhas moedas por uma vantagem cadastrada por uma empresa parceira, para que eu possa utilizar o benefício através de um cupom digital. 

### **Regras de Negócio**

Validação de Saldo: O sistema só deve permitir o resgate se o saldo do aluno for maior ou igual ao custo da vantagem.

Geração de Cupom : O cupom gerado deve ser um código único.

Persistência: O valor da vantagem deve ser debitado instantaneamente do extrato do aluno.

### 

###  **Cenário de Teste** 

Cenário: Resgate realizado com sucesso

Sou um aluno logado e possuo 100 moedas, e existe uma vantagem "Café Grátis" que custa 50 moedas, quando eu clico em "Resgatar Vantagem" então meu saldo deve ser atualizado para 50 moedas e eu devo receber um código do voucher.

