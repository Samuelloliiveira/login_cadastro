//recebe o nome do usuário pela URL

const innerHTMLName = {

  nameUserPage() {

    //pegando valor da url
    const url_string = window.location.href;
    const url = new URL(url_string);
    const name = url.searchParams.get("name"); //pega o value

    //Pega o p da página inicial
    const user = document.querySelector('.userPage p')
    user.innerHTML = name

  }
}

innerHTMLName.nameUserPage()