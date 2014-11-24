var NavItem = React.createClass({
    getInitialState: function() {
        return {selected: false};
    },
    render: function() {
        return (
            <div className={this.props.selected ? "pure-menu-selected" : ""}><a >{this.props.title}</a></div>
        )
    }
});
var Header = React.createClass({
    handleClick: function(i) {
          this.props.onClick(this, i);
    },
    render: function() {
        var navItems = this.props.pages.map(function(pageName, i) {
            return (
                <li name={pageName} onClick={this.handleClick.bind(this, i)} onTouchStart={this.handleClick.bind(this, i)} ><NavItem key={i} title={pageName} selected={i==this.props.pageIndex}/></li>
                )
        }, this)
        return (
            <div className="home-menu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed">
                <a className="pure-menu-heading" href="/">PRISM</a>
                <ul >{navItems}</ul>
            </div>
        );
    }
});
// footer
var Footer = React.createClass({
    render: function() {
        return (<footer className="footer l-box is-center">
<h3 className="footer-head"><a href="https://github.com/zhxnlai/GlassPad"><i className="fa fa-github "></i>Find us on Github</a></h3>
<h4 className="footer-head">Copyright © 2112 PRISM Inc. All Rights Reserved.</h4>
        </footer>
        );
    }
});
// bullet point list

// splash
var Splash = React.createClass({
    render: function() {
        return <div className="splash-container">{this.props.content}</div>
    }
})
var ImageCarousel = React.createClass({
    render: function() {
//        console.log("images" + self.props.urls)
        var images = (this.props.urls.map(function(url) {return (                  <div className="item"><img className="pure-img" src={url}/></div>)}, this))
        return ( <div className="splash-owl">{images}</div>
        )}
})
var ContentWrapper = React.createClass({
    render: function() {
        return <div className="content-wrapper">{this.props.content}</div>
    }
})
var ContentWrapperOther = React.createClass({
    render: function() {
        return <div className="content-wrapper-other">{this.props.content}</div>
    }
})
var BulletPoints = React.createClass({
    render: function() {
        var bulletPointNodes = this.props.points.map(function(point) {return (<div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <h3 className="content-subhead">
                    <i className="fa fa-rocket"></i>
                    {point.title}
                </h3>
                <p> {point.detail}
                </p></div>)}, this)
        return (<div class="content">
        <h2 className="content-head is-center">{this.props.header}</h2>
                {bulletPointNodes}
               </div>)
    }
})
var Features = React.createClass({
    render: function() {
        var featureNodes = this.props.points.map(function(point) {return (<div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
        <h2 className="content-head is-center">{point.title}</h2>
        <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
        <img className="pure-img-responsive" alt="File Icons" width="300" src="img/common/file-icons.png"/>
        </div>
<div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
                <p> {point.detail}
                </p></div></div>)}, this)
        return (<div className="content">
                {featureNodes}
               </div>)
    }
})
// bio in markdown format

// feature banner



var PageNotFound = React.createClass({
  render: function() {
    return (
        <h1>Page not Found</h1>
    );
  }
});


var imageURLs = ["resources/tablet-landscape.png"]
var bulletPointsHeader = "aljs;dfjk;we"
var bulletPoints = [{"i": "fa fa-rocket", "title": "best product", "detail": "ials;dfjl;awjef"}]
var Home = React.createClass({
  render: function() {
    return (
    <div>
    <Splash content={<ImageCarousel urls={imageURLs}/>}/>
    <ContentWrapper content={<div>
        <BulletPoints header={bulletPointsHeader} points={bulletPoints}/>
        <Footer />
        </div>}/>
        </div>
    );
  }
});

var features = [{title:"scans", url:"", detail:"Lorem ipsum dolor sit amet, consectetur adipisicing elit,"}]
var Features = React.createClass({
  render: function() {
    return (
    <div>
    <ContentWrapperOther content={
        <div>
        <Features points={features}/>
        <Footer /></div>}
        />
        </div>
    );
  }
});

var AjaxSectionWrapper = React.createClass({
  getInitialState: function() {
    return {content: <div />};
  },
  componentDidMount: function() {
      $.ajax({
      url: this.props.url,
      dataType: 'html',
      success: function(data) {
        this.setState({content: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    render: function() {
      return (
              <section name={this.props.sectionName} dangerouslySetInnerHTML={{__html: this.state.content}} />

      )}

})

var Buy_now = React.createClass({
    render: function() {
        return (
        <div>
          <ContentWrapperOther content={
            <div className="content">
      				<h2 className="content-head is-center">Sign up for the latest updates.</h2>
                <div className="pure-g">
                    <div className="l-box-lrg pure-u-1-2 pure-u-md-2-5">
                        <img className="pure-img" src="resources/tablet-home.png" />
                    </div>
          					<div className="l-box-lrg pure-u-1-2 pure-u-md-2-5">
          						<form className="pure-form pure-form-stacked">
          							<fieldset>
          								<label for="name">Name</label>
          								<input id="name" type="text" placeholder="Your Name"/>
          								<label for="email">Email</label>
          								<input id="email" type="email" placeholder="Your Email"/>
          								<button type="submit" class="pure-button">Keep me informed</button>
          							</fieldset>
          						</form>
          					</div>

      				</div>
      			</div>
            } />
        </div>

        )
    }
});


var Router = React.createClass({
    getInitialState: function() {
        return {pageIndex:0, pageHtml:this.props.pageHtmls[0], component: <div />};
    },
  componentDidMount: function() {
    var scrollTop = $(document).scrollTop()
    var accHeight = 0;
    console.log("scroll Top: "+scrollTop)
    for (var i=0;i<this.props.pages.length;i++) {
      var name = this.props.pages[i]
      accHeight = accHeight+ $("section[name='"+name+"']").height()
      if (scrollTop<=accHeight) {
        // console.log("name "+name)
        this.setState({pageIndex:i})
        break;
      }
    }

  },

  handleHeaderClick: function(o, i) {
    console.log("click: "+i + ' html: '+this.props.pageHtmls[i])
    // page(i==0 ? '/':'/'+this.props.pages[i])
// this.setState({pageIndex: i, component: <AjaxContentWrapper url={this.props.pageHtmls[i]}/>})
    this.setState({pageIndex: i, pageHtml: this.props.pageHtmls[i]})

    $("html, body").animate({
        scrollTop: $("section[name='"+this.props.pages[i]+"']").offset().top
    });


  },
  handleScroll: function(e) {
    var scrollTop = $(document).scrollTop()
    var accHeight = 0;
    for (var i=0;i<this.props.pages.length;i++) {
      var name = this.props.pages[i]
      accHeight = accHeight+ $("section[name='"+name+"']").height()
      if (scrollTop<=accHeight) {
        this.setState({pageIndex:i})
        break;
      }
    }
  },
  render: function () {
    var contents = this.props.pageHtmls.map(function(pageHtml, i) {
      return (<div>
      <AjaxSectionWrapper sectionName={this.props.pages[i]} url={"components/"+pageHtml}/>
      </div>)
    },this)
    return (<div>
            <Header pages={this.props.pages} pageIndex={this.state.pageIndex} onClick={this.handleHeaderClick} onTouchStart={this.handleHeaderClick}/>
            <ContentWrapperOther ref="content" content={
                <div onWheel={this.handleScroll} onTouchMove={this.handleScroll}>
                {contents}
                <Footer /></div>} />

            </div>)
  }
});

//<hr className="style-two"/>

React.initializeTouchEvents(true)

var pages = ["Home", "Design", "Features", "Specs", "History", "About", "Buy-Now"]
var pageHtmls = ["home.html", "design.html", "features.html", "specs.html", "history.html", "about.html", "buy_now.html"]
React.render(<Router pages={pages} pageHtmls={pageHtmls}/>, document.querySelector('body'));

// $(document).ready(function(){
//   for (var i=0;i<pages.length; i++) {
//
//   $("section[name='"+pages[i]+"']").waypoint(function() {
//     var name = $(this).attr("name")
//     console.log('Basic example callback triggered.'+$(this).attr("name"))
//     // $('li[name='+name+']').click();
//   });
// }

// });
