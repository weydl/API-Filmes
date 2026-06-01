export class AppError extends Error {
    constructor(
      public statusCode: number,
      message: string
    ) {
      super(message);
      this.name = "AppError";
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(recurso: string) {
      super(404, `${recurso} não encontrado`);
    }
  }
  
  export class ValidationError extends AppError {
    public erros: string[];
  
    constructor(erros: string[]) {
      super(400, "Dados inválidos");
      this.erros = erros;
    }
  }