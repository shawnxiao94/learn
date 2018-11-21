

function delay( word ) {
	return new Promise((reslove,reject) => {
		setTimeout( () => {
			reslove(word)
		},2000)
	})
}

// async + await 要一起使用
async function start() {
	const word1 = await delay('xiao1')
	console.log(word1)
	const word2 = await delay('qiu2')
	console.log(word2)
	const word3 = await delay('lin3')
	console.log(word3)		
}
start()

// delay('xiao')
// 	.then( (word) => {
// 		console.log(word)
// 		return delay('qiu')
// 	})
// 	.then( (word) => {
// 		console.log(word)
// 		return delay('lin')
// 	})
// 	.then((word) => {
// 		console.log(word)
// 	})