const HelloWorld = (text = "Hello World") => {
    const elm = document.createElement("dic");
    elm.innerHTML = text;

    elm.onclick = () =>
        import ('./lazy').then(lazy => {
            elm.textContent = lazy.default;
        }).catch(err => {
            console.log(err);
        });

    return elm;
}

export default HelloWorld;