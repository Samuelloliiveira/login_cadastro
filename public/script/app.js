const Storage = {
  get() {
    /* O método JSON.parse() analisa uma string JSON, construindo o valor 
    ou um objeto JavaScript descrito pela string. */
    return JSON.parse(localStorage.getItem("registration")) || []
  },

  //Setando os dados para o local storage
  set(userData) {
    localStorage.setItem("registration",
    //O método JSON.stringify() converte valores em javascript para uma String  JSON.
    JSON.stringify(userData))
  }
}

const registrations = {
    
  users: Storage.get(),

  add(newUser) {
    registrations.users.push(newUser)
    app.init()
  }

}

const LoginForm = {

  email: document.getElementById('email'),
  password: document.getElementById('password'),

  getDados() {
    const dataStorage = Storage.get()

    //varendo o array de objetos e me retornando os email e senha
    for(let users of dataStorage){
      return users.email, users.password
    }
  },

  ExistsUsers() {
    //VERIFICAR SE USUÁRIO JÁ EXISTE NO BANCO E SE SIM ABRIR - SE NÃO ALERTA
  }

}

const registrationForm = {

  name: document.getElementById('name'),
  lastName: document.getElementById('lastName'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  confirmPassword: document.getElementById('confirmPassword'),

  getValues() {
    return {
      name: registrationForm.name.value,
      lastName: registrationForm.lastName.value,
      email: registrationForm.email.value,
      password: registrationForm.password.value,
      confirmPassword: registrationForm.confirmPassword.value,
    }
  },

  ValidData() {
      
    const {
      name, 
      lastName, 
      email, 
      password, 
      confirmPassword
    } = registrationForm.getValues()

    if(
      name === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '') {
        throw new Error('Preencha todos os campos')
    }if(confirmPassword != password) {
      throw new Error('As senhas não coincidem!')
    }
  },

  //aqui ele retorna somente os dados validos para cadastro
  returnsvalidData() {

    const {
      name, 
      lastName, 
      email, 
      password
    } = registrationForm.getValues()


    if(email === LoginForm.getDados()) {
      alert('Email já existe')
    }else {
      return {name, lastName, email, password}
    }
  },

  submit(event) {//submeter o formulário=
    event.preventDefault()//Não passa valores pela url

    const dataUsers = registrationForm.returnsvalidData()

    console.log(registrationForm.getDados)

    try {

      registrationForm.ValidData()
      registrations.add(dataUsers)

    } catch (error) {
      alert(error.message)
    }

  }
}

const app = {
  init() {
    Storage.set(registrations.users)
  }
}

//o local storage vai começar vazio
app.init()

//ABRIR TELA DE INICIO E COLOCAR O NOME DA PESSOA
//FAZER O LOGIM
//ADICIONAR SEMANTICA
//NÃO CADASTRAR O MESMO EMAIL