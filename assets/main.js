//call the api of youtube for my videos
let content = null || document.getElementById("content")
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCX9NJ471o7Wie1DQe94RVIg&part=snippet%2Cid&order=date&maxResults=50';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '00eb7899c3msh388e1340308f5e1p106b15jsn1e9a388de09c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};


async function fetchData(urlApi){
    const response = await fetch(urlApi,options)
    const data = await response.json();
    return data;
}

//create a anonym function(automatic function)
(async ()=>{
    try{
        const videos = await fetchData(API);
        console.log(videos);
        //generate template 
        let view = `
            ${videos.items.map(video => `
            <div class="group relative ">
            <div
                class="w-full bg-black-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-slate-100">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
                </h3>
            </div>
            </div>
            `).slice(0,8).join('')} 
        `
        content.innerHTML = view;
    }catch(err){
        console.error(err)
    }
})();



