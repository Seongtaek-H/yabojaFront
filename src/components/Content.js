function Content({coverImg, title}) {
    if(title!=undefined) {
        if(title.length>15){
            title=title.slice(0, 14) + "...";
        }
    }
    return (
        <div>
          <img src={coverImg} alt={title} />
          <h2>
              {title}
            </h2>
        </div>
      );
}

export default Content;