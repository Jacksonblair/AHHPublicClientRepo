import react from 'react'

let usePagination = (_pageSize, _content) => {

	let [ page, setPage ] = react.useState(0) // Current page
	let [ pages, setPages ] = react.useState([]) // 2d array of paginated items

	/*
		How does it work:
		- We get a pagesize variable, and some content to paginate
		- We return page, setPage, items, setItems
	*/

	react.useEffect(() => {

		if (_content.length) {
			// Create a 2d array based on content length and pagesize
			let items = new Array(Math.ceil(_content.length/_pageSize)).fill(0).map(() => new Array()) 		

			// Iterate through our content, and place each item in correct page
			_content.forEach((item, i) => {
				items[Math.floor(i / _pageSize)].push(item)
			})

			// Make sure 'page' is valid for the array size, since users can change it
			if (pages.length + 1 !== page) {
				setPage(0)
			}

			setPages([...items])
		} else {
			setPages([])
		}

	}, [_content])

	return { page, setPage, pages }

}

export default usePagination