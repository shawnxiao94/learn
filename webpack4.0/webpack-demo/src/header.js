function Header() {
	var dom = document.getElementById('root');
	var header = document.createElement('div')
	header.innerText = 'header';
	dom.append(header)
}
console.log('header')
export default Header