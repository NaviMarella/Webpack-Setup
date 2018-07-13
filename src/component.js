const HelloWorld = (text = "Hello World") => {
    const elm = document.createElement("dic");
    elm.innerHTML = text;
    return elm;
}

export default HelloWorld;