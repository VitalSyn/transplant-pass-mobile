export function formatPhone(v: string): string {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
};

export function formataCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length > 3 && cpf.length <= 6) {
    cpf = cpf.replace(/(\d{3})(\d+)/, '$1.$2');
  } else if (cpf.length > 6 && cpf.length <= 9) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  } else if (cpf.length > 9) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }

  return cpf;
}

export function formataPhone(phone: string): string {
  phone = phone.replace(/\D/g, '');

  if (phone.length > 2 && phone.length <= 6) {
    phone = phone.replace(/(\d{2})(\d+)/, '($1)$2');
  } else if (phone.length > 6 && phone.length <= 10) {
    phone = phone.replace(/(\d{2})(\d{1})(\d+)/, '($1)$2.$3');
  } else if (phone.length > 10) {
    phone = phone.replace(/(\d{2})(\d{1})(\d{4})(\d{1,4})/, '($1)$2.$3-$4');
  }

  return phone;
}

export function formataCEP(cep: string): string {
  cep = cep.replace(/\D/g, '');

  if (cep.length > 5) {
    cep = cep.replace(/(\d{5})(\d+)/, '$1-$2');
  }

  return cep;
}

export function validateEmail(email: string): RegExpMatchArray | null {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
