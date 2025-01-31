import React, { useEffect } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import { useState } from 'react'
import moment from 'moment'


const PlayVideo = ({videoId}) => {
   

  const [apiData,setApiData] = useState(null);
  const [channelData,setChannelData] = useState(null);
  const [commentData,setCommentData] = useState([]);
  
  const fetchVideoData = async()=>{
    // We are fetching videos ddata now
    const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
  }
  const fetchChannelData = async()=>
    {
    // we are fetching channel data now
    const channelDetails_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetails_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));
    // we are fetching comment data now
    const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY};
`
await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items[0]));
    }
  useEffect(()=>{
    fetchVideoData();
  },[])

  useEffect(()=>{
    fetchChannelData();
  },[apiData])

  return (
    <div className='play-video'>
        {/*<video src={video1} controls autoPlay muted ></video>*/}
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"500cr"} Views &bull; { apiData?moment(apiData.snippet.publishedAt).fromNow():"unknowdate"} </p>
            <div>
                <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):5}</span>
                <span><img src={dislike} alt="" />0</span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
         <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span>{channelData?value_converter(channelData.statistics.subscriberCount):""} subscribers</span>   
        </div>
        <button>SUBSCRIBE</button>
        </div>
       

        <div className="vid-description">
        <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"}</p>
        <hr />
        <h4>{apiData?value_converter(apiData.statistics.commentCount):5}comments</h4>
        {commentData.map((item,index)=>{
            return(
            <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl } alt="" />
                <div>
                    <h3>Sam Altman <span>5 days ago</span></h3>
                    <p>This is the comment:mrbeast is awesome</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>1M</span>
                        <img src={dislike} alt="" />
                        <span>0</span>
                    </div>
                </div>
            </div>
            )
            
       
        })}
        

        </div>
    </div>

  )
}

export default PlayVideo
