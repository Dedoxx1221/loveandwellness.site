
    function atomiApplyParams({inputUrl}) {
      try {
        console.log(inputUrl)
        const inputUrlObj = new URL(inputUrl, window.location.origin);
        const currentPageParams = new URLSearchParams(window.location.search);
        const inputUrlParams = new URLSearchParams(inputUrlObj.search);
      
        // Iterate over all parameters in the current page's URL
        for (const [key, value] of currentPageParams) {
          // If the input URL does not already contain the parameter, add it
          if (!inputUrlParams.has(key)) {
            inputUrlParams.append(key, value);
          }
        }
      
        // Construct the final URL
        const finalUrl = inputUrlObj.origin + inputUrlObj.pathname + '?' + inputUrlParams.toString();
        console.log(finalUrl)
        return finalUrl;
      } catch (error) {
        console.log(error);
      }
    }

    function atomiFormatDate(options = { slated: false, addDate: 0 }) {
      try {
        const userLocale = navigator.language || 'en-US';
        const defaultOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        const today = new Date();

        if (options.slated) {
          const slatedDate = new Date(today);
          slatedDate.setDate(slatedDate.getDate() + (options.addDate || 0));

          const formatter = new Intl.DateTimeFormat(userLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });

          return formatter.format(slatedDate);

          // const day = slatedDate.getDate().toString().padStart(2, "0");
          // const month = (slatedDate.getMonth() + 1).toString().padStart(2, "0");
          // const year = slatedDate.getFullYear();
          // return `${day}/${month}/${year}`;
        }

        if(options.addDate){
          today.setDate(today.getDate()+options.addDate)
        }
        const formattedDate = today.toLocaleDateString(userLocale, defaultOptions);

        return formattedDate;
      } catch (error) {
        console.log(error);
      }
    };

    function atomiFormatTime() {
      try {
        const now = new Date();
        return now.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      } catch (error) {
        console.log(error);
      }
    };
    function runDelayedFunctions(data) {
      try {
        document.querySelectorAll('.atomicat-delay').forEach(el => el.classList.remove('atomicat-delay'));
        if(data?.setDisplayed){
          localStorage.setItem(data?.setDisplayed, true);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  
      (function() {
        function atomiRdn(e, t) {
          try {
            return Math.floor(Math.random() * (t - e + 1) + e)
          } catch (error) {
            console.log(error);
          }
        }

        try {
          let initial = atomiRdn(400,700);
          setInterval(() => {
            document.querySelectorAll('.atomicat-random').forEach(el => {
              el.innerText = initial.toString();
            });
            initial += atomiRdn(-1, 2);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      })();
    
    (function() {
      try {
        document.addEventListener('DOMContentLoaded', function () {
          document.addEventListener("keydown", function (e) {
            e.ctrlKey && e.preventDefault();
          }),
          (document.onkeydown = function (e) {
            if (123 == e.keyCode) return !1;
          }),
          document.addEventListener("contextmenu", (e) => e.preventDefault());
        });
      } catch (error) {
        console.log(error);
      }
    })();
    
    (function() {
      try {
        const accordionTitles = document.querySelectorAll(".atomicat-accordion-title");
        accordionTitles.forEach((title, index) => {
          title.addEventListener("click", () => {
            title.classList.toggle("atomicat-title-active");
            const accordionContent = title.nextElementSibling;
            const toggleSymbol = title.querySelector(".atomicat-accordion-toggle");
            title.childNodes[1].childNodes[0].classList.toggle('atomicat-hidden')
            title.childNodes[1].childNodes[1].classList.toggle('atomicat-hidden')
            accordionContent.classList.toggle("atomicat-content-inactive");
            accordionContent.nextElementSibling.classList.toggle("atomicat-hidden");
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();
    (function() {

    try {
        const conditionalDisplayList = [{"style":{"container":{"flexDirection":{"desktop":"row"}},"outer":{"background":{"desktop":"rgba(0, 0, 0, 1)"}},"page":{"background":{"mobile":"rgba(0, 0, 0, 1)","desktop":"rgba(0, 0, 0, 1)"}}},"contKey":"affabcd8-9a25-4a26-b1f2-0b3c50c390f9","misc":{"conditionalDisplay":{"active":true,"visibility":"hidden"},"firstContainer":true,"type":"container"},"contents":[{"misc":{"contentWidth":"fullWidth","type":"container"},"contents":[{"compKey":"d6cdb565-7eb3-4757-a7b5-a0edb8498e0c","misc":{"loop":false,"conditionalDisplay":{"active":false},"type":"video","lazyLoad":false,"tag":"iframe","controls":false,"delayed":true,"src":"<div id=\"vid_67b9068ad984d3618d71f29f\" style=\"position: relative; width: 100%; padding: 56.25% 0 0;\"> <img id=\"thumb_67b9068ad984d3618d71f29f\" src=\"https://images.converteai.net/604d901a-e52a-4a62-9e49-af2cf87c7464/players/67b9068ad984d3618d71f29f/thumbnail.jpg\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;\" alt=\"thumbnail\"> <div id=\"backdrop_67b9068ad984d3618d71f29f\" style=\" -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%; \"></div> </div> <script type=\"text/javascript\" id=\"scr_67b9068ad984d3618d71f29f\"> var s=document.createElement(\"script\"); s.src=\"https://scripts.converteai.net/604d901a-e52a-4a62-9e49-af2cf87c7464/players/67b9068ad984d3618d71f29f/player.js\", s.async=!0,document.head.appendChild(s); </script>","mute":false,"autoplay":false,"player":"vturb"},"style":{"outer":{"tooltip":{"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);","arrow":{"desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0); border-right-color: #555;"}},"boxShadow":"0px 0px 31px 4px rgba(251, 246, 246, 1) "}}}],"style":{"outer":{"background":{"desktop":"rgba(3, 3, 3, 1)"}},"container":{"flexDirection":{"desktop":"column"},"width":{"mobile":"100%","desktop":"100%"}}},"contKey":"3019c486-1932-48d8-8c64-cc9db64e36ba"}]},{"misc":{"type":"container","conditionalDisplay":{"active":true,"visibility":"hidden","applicable":"trueAny"},"contentWidth":"fullWidth"},"style":{"container":{"flexDirection":{"desktop":"column"},"width":{"mobile":"100%","desktop":"100%"}}},"contents":[{"misc":{"type":"text","tag":"h1","content":"$random personas mirando ahora mismo..."},"compKey":"a1f0a1e0-0707-4ca4-8251-ca49bf5ea9f9","style":{"text":{"fontSize":{"desktop":"16px","mobile":"13px"},"textAlign":{"desktop":"center"},"fontWeight":{"mobile":"600"},"backgroundImage":"unset","color":"rgba(248, 246, 246, 1)"},"outer":{"paddingTop":{"mobile":"0px"},"tooltip":{"mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);","desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);","arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0); border-right-color: #555;","desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0); border-right-color: #555;"}},"paddingRight":{"mobile":"0px"},"background":{"desktop":"rgba(0, 0, 0, 1)"},"marginBottom":{"mobile":"px"},"order":{"mobile":"0"},"marginTop":{"mobile":"9px"}}}},{"misc":{"type":"divider","delay":true,"titleTag":"p","tag":"span"},"compKey":"b6697e65-8029-4551-9fec-ab2307279607","style":{"outer":{"tooltip":{"arrow":{"mobile":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0); border-right-color: #555;","desktop":"top: calc(50% - 5px); right: 100%; left: auto; bottom: auto; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0); border-right-color: #555;"},"desktop":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);","mobile":"top: 50%; left: 100%; bottom: auto; right: auto; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%); -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; margin-left: 10px; border-color: rgba(0, 0, 0, 0) #000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);"}},"divider":{"border":{"width":"1px","image":"rgba(241, 9, 9, 1)","style":"solid"},"maskImage":"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' overflow='visible' height='100%' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='10' stroke-linecap='square' stroke-miterlimit='10'%3E%3Cpath d='M0,6c6,0,6,13,12,13S18,6,24,6'/%3E%3C/svg%3E\")","width":{"desktop":"100%"},"paddingBottom":{"desktop":"9px"},"paddingTop":{"desktop":"9px"}}}}],"contKey":"fb284b68-02f9-45ae-aa45-05a0da478667"}];
        conditionalDisplayList.forEach((item) => {
            const { type, conditionalDisplay } = item.misc;
            const { visibility = "visible", logics, applicable = "trueAll" } = conditionalDisplay;
            const key = item?.compKey?.slice(0, 7) || item?.contKey?.slice(0, 7);
            const elementClass = type === "container" ? ".atomicat-container-" + key : ".atomicat-element-container-" + key;
            const targetElement = document.querySelector(elementClass);
            const showItem = () => {
              targetElement.classList.remove("atomicat-hidden");
            }

            const visibilityFxn = (logic) => {
                if(visibility === "visible") {
                  return !logic;
                } else {
                  return logic; 
                }
              }
            const resultArr = [];
            
            if(visibility !== "hideWithoutCondition" &&  logics?.length ) {
              for (let i = 0; i < logics?.length; i++) {
                  const logic = logics[i];
                  const { type } = logic;
                  if(type === "dateAndTime") {
                     const { date, date2, dateCondition = "between" } = logic;
                      const currentDate = new Date().getTime();
                      const fromDate = new Date(date).getTime();
                      const toDate = new Date(date2).getTime();
                      const logicObj = {
                        between: currentDate >= fromDate && currentDate <= toDate,
                        notBetween: currentDate < fromDate || currentDate > toDate,
                      }

                      resultArr.push(logicObj[dateCondition]);
                  } else if(type === "query") {
                     const { query, queryCondition = "include" } = logic;
                    const windowQuery = window.location.search;

                    const urlParams = new URLSearchParams(window.location.search);
                    const param = query.split("=")

                    const includeQuery = param.length > 1 ? urlParams?.get(param[0])?.includes(param[1]) : urlParams?.get(param[0]) != null;
                    const queryObj = {
                      include: includeQuery,
                      exclude: !includeQuery,
                    }

                    resultArr.push(queryObj[queryCondition]);
                  } else if(type === "browser") {
                    const { browsers, browserCondition = "include" } = logic; 
                    const iphoneKeyWords = ["iPhone", "iPad", "iPod", "Macintosh"];
                    const { userAgent } = navigator;
                    const isIphone = iphoneKeyWords.some((item) => userAgent.includes(item));
                    const chromeBrowsers = ["Edg", "OPR"];
                    const nonIphoneAgent = (chromeBrowsers.some(item => userAgent.includes(item)) ? userAgent.replace("Chrome", "") : userAgent)?.replace("Safari", "");
                    const iphoneAgent = userAgent.replace("Safari", "");
                    const isSafariOnIOS = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPT/.test(userAgent);
                    const updateUserAgent = isIphone ? iphoneAgent : nonIphoneAgent;
                    const isBrowser = isIphone && isSafariOnIOS ? true : browsers.find((browser) => updateUserAgent.includes(isIphone ? browser?.ios : browser?.value)) ? true : false;
                    const browserObj = {
                      include: isBrowser,
                      exclude: !isBrowser
                    }

                    resultArr.push(browserObj[browserCondition]);
                  }
              }


              const allTrue = resultArr.every((item) => item === true);
              const oneTrue = resultArr.some((item) => item === true);

              const applicableObj = {
                trueAll: allTrue,
                trueAny: oneTrue  
              }
              const isApplicable = applicableObj[applicable];

              const visibilityObj = {
                visible: isApplicable,
                hidden: !isApplicable
              }

              const isVisibility = visibilityObj[visibility];

              if(isVisibility) {
                showItem();
              }

            }
            
          })
    } catch (error) {
        return error;
    }
    })();(function() {
          try {
              const clickeventList = [{"compKey":"188a3647-db5c-4eb0-b6c8-9c47e56a0f6c","misc":{"type":"image"}},{"compKey":"d2e279be-d185-403a-815d-dd430d07721a","misc":{"type":"button"}},{"compKey":"12dd4df9-bdc8-4a50-bd75-7e91ab840a54","misc":{"type":"button"}},{"compKey":"8619d212-29cd-4153-bc1a-e6b4cd9f764a","misc":{"type":"image"}},{"compKey":"79682a0c-1791-4915-be09-71ecf65f41b8","misc":{"type":"button"}},{"compKey":"f8ae20e7-5a3d-4944-a866-af2826ed97ca","misc":{"type":"button"}},{"compKey":"64165dba-1f97-4db9-9bf7-25db29aae602","misc":{"type":"image"}},{"compKey":"e5081438-92b5-4201-88bd-10150eea6d64","misc":{"type":"button"}},{"compKey":"1c39e03b-8ea6-4c41-bc6b-21c461915031","misc":{"type":"button"}}];
    
    
              clickeventList.forEach((comp, index) => {
                  const compKey = comp?.compKey?.slice(0, 7);
                  const eleType = comp?.misc?.type;
                  const showItemsById = comp?.misc?.showItemsById || comp?.misc?.showItemsByClass;
                  const hideAfterClick = comp?.misc?.hideAfterClick;
                  const hideOnComplete = comp?.misc?.hideOnComplete;
                  if(hideAfterClick) {
                    const hideAfterClickEle = document.querySelector(`.atomicat-hide-after-click-${compKey}`);
                    console.log(hideAfterClickEle, "hideAfterClickEle")
                    if (hideAfterClickEle) {
                      hideAfterClickEle.addEventListener("click", function() {
                          console.log("hideAfterClickEle clicked")
                          hideAfterClickEle.classList.add("atomicat-hidden");
                      })
                    }
                  }
                  if(hideOnComplete) {
                    const hideOnCompleteEle = document.querySelector(`.atomicat-hide-on-complete-${compKey}`);
                    console.log(hideOnCompleteEle, "hideOnCompleteEle")
                    if (hideOnCompleteEle) {
                      hideOnCompleteEle.addEventListener("animationend", function() {
                          console.log("hideOnCompleteEle animationend")
                          hideOnCompleteEle.classList.add("atomicat-hidden");
                      })
                    }
                  }
                  if(showItemsById) {
                    const showItemsByIdEle = document.querySelector(`.atomicat-show-hidden-item-${compKey}`);
                    if(eleType === "progressbar"){
                      showItemsByIdEle.addEventListener("animationend", function() {
                        atomiShowItems()
                      })
                    } else{
                      showItemsByIdEle.addEventListener("click", function() {
                        atomiShowItems()
                      })
                    }
                    function atomiShowItems() {
                      showItemsById.forEach((item) => {
                        const hiddenItem = document.querySelector(`#${item}`) || document.querySelector(`.${item}`);
                        if (hiddenItem) {
                          hiddenItem.classList.remove("atomicat-delay");
                        }
                      })
                    }
                  }
              });
    
          } catch (error) {
              console.log(error);
          }
      })();
          (function() {
            try {
              var vturbvideoId = "67b9068ad984d3618d71f29f";
              var SECONDS_TO_DISPLAY = 2292;
              var attempts = 0;
              var elsDisplayed = false;
              var alreadyDisplayedKey = 'alreadyElsDisplayed2879';
              var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

              var showHiddenElements = function () {
                elsDisplayed = true;
                runDelayedFunctions();
                localStorage.setItem(alreadyDisplayedKey, true);
              };
              if (alreadyElsDisplayed === 'true') {
                setTimeout(function () {
                  showHiddenElements();
                }, 100);
              } else {
                startWatchVideoProgress();
              }
              function getVideoInstance() {
                if (smartplayer.instances.length > 1) {
                  return smartplayer.instances.find(
                    (instance) => instance.options.id === vturbvideoId
                  );
                }
                return smartplayer.instances[0];
              };
              function startWatchVideoProgress() {
                if (typeof smartplayer === 'undefined' || !(smartplayer.instances && smartplayer.instances.length)) {
                  if (attempts >= 10) return;
                  attempts += 1;
                  return setTimeout(function () {
                    startWatchVideoProgress();
                  }, 1000);
                }
                console.log(smartplayer.instances);
                var videoInstance = getVideoInstance();
                videoInstance.on('timeupdate', () => {
                  if (elsDisplayed || videoInstance.smartAutoPlay) return;
                  console.log("currentTime => " +videoInstance.video.currentTime +" SECONDS_TO_DISPLAY => " +SECONDS_TO_DISPLAY);
                  if (videoInstance.video.currentTime < SECONDS_TO_DISPLAY) return;
                  showHiddenElements();
                });
              };
            } catch (error) {
              console.log(error);
            }
            
          })();
        
