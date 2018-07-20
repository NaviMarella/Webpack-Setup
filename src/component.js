import styles from './main.css';

const HelloWorld = (text = "Hello World") => {
    const elm = document.createElement("dic");
    elm.innerHTML = text;

    elm.onclick = () =>
        import ('./lazy').then(lazy => {
            elm.textContent = lazy.default;
        }).catch(err => {
            console.log(err);
        });
    elm.className = styles.redButton;
    return elm;
}

export default HelloWorld;