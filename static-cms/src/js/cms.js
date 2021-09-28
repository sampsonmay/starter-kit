// CSS Import
import '../scss/cms.scss';

import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.css';

import 'tinymce/plugins/paste';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';

import contentUiCss from 'tinymce/skins/ui/oxide/content.css';
import contentCss from 'tinymce/skins/content/default/content.css';

const FetchAPI = (url, method, data, success, error) => {
    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(typeof success === "function") {
            success(data);
        }
    })
    .catch((error) => {
        if(typeof error === "function")
            error();
    });
}


(function() {
    
    const CMS = document.querySelector("[data-cms]");
    const EDITORS = document.querySelectorAll("[data-editor], [data-single]");
    const BUILD = document.querySelector("[data-cms-build]");
    const SETTINGS = document.querySelector("[data-cms-settings]");

    const activeClass = "is-active";
    const loadingClass = "is-loading";
    
    
    /**
     * Close
     * Close and clean up the CMS panel
     * 
     * @param {bool} reload 
     *
     */
    const Close = (reload = false) => {
        CMS.classList.remove(activeClass);
        CMS.classList.remove(loadingClass);

        // Destroy the TINY MCE Editor is there is one
        if(tinymce.activeEditor)
            tinymce.activeEditor.destroy();

        // Reload the browser to show latest changes
        if(reload)
            location.reload();
    }


    /**
     * Update
     * Show the CMS panel when the user clicks on an editable element.
     * On save, call the end point to update the templates and data files.
     * 
     * @param {element} el 
     */
    const EDITOR_UPDATE = (el) => {
        let newEditable = el.dataset.key == undefined ? true : false;
        let html = el.innerHTML;
        let key = newEditable ? 'field__' + Date.now() : el.dataset.key;
        let editor = el.dataset.editor != undefined;

        const success = (data) => {
            Close(true);
        }

        const error = () => {
            console.log("ERROR");
        }
        
        // Create the HTML 
        if(editor) {
            CMS.innerHTML = '<div class="cms__inner cms__inner--editor"><form>\
                                <div class="cms__field"><textarea id="tiny" data-field>'+html+'</textarea></div>\
                                <div class="cms__actions"><button data-save>Save</button><button data-cancel>Cancel</button></div>\
                            </form></div>';
            
            // Initilise the TinyMCE Editor
            tinymce.init({
                selector: 'textarea#tiny',
                menubar: false,
                plugins: "paste lists link code table",
                toolbar: 'formatselect | bold italic underline subscript superscript | bullist numlist | link | table | code',
                skin: false,
                content_css: false,
                content_style: contentUiCss.toString() + '\n' + contentCss.toString(),
                paste_as_text: true,
                table_toolbar: 'tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol'
              });

        } else {
            CMS.innerHTML = '<div class="cms__inner cms__inner--single"><form>\
                                <div class="cms__field"><input type="text" value="'+html+'" data-field/></div>\
                                <div class="cms__actions"><button data-save>Save</button><button data-cancel>Cancel</button></div>\
                            </form></div>';
        }
        CMS.classList.add(activeClass);

        
        // Save the changes
        CMS.querySelector("[data-save]").addEventListener("click", e => {
            e.preventDefault();
            
            CMS.classList.add(loadingClass);

            let url = ( window.location.pathname == '/') ? '/home/' : window.location.pathname.substr(-1) === '/' ?  window.location.pathname :  window.location.pathname + "/";
            let newHtml = editor ? tinyMCE.activeEditor.getContent() : CMS.querySelector("[data-field]").value;
            let data = {
                key,
                new: newEditable,
                element: el.outerHTML,
                oldHtml: html,
                html: newHtml
            };
            FetchAPI(url + 'update', 'POST', data, success, error);
        });

        // Cancel
        CMS.querySelector("[data-cancel]").addEventListener("click", e => {
            e.preventDefault();
            Close();
        });
    }
    

    const SETTINGS_UPDATE = () => {
        let keywords = document.querySelector("meta[name='keywords']").getAttribute("content");
        let description = document.querySelector("meta[name='description']").getAttribute("content");

        CMS.innerHTML = '<div class="cms__inner cms__inner--form"><form>\
                            <div class="cms__form">\
                                <div class="cms__field">\
                                    <label for="keywords">Keywords:</label>\
                                    <input name="keywords" type="text" value="'+keywords+'" data-keywords />\
                                </div>\
                                <div class="cms__field">\
                                    <label for="description">Description</label>\
                                    <input name="description" type="text" value="'+description+'" data-description />\
                                </div>\
                            </div>\
                            <div class="cms__actions"><button data-save>Save</button><button data-cancel>Cancel</button></div>\
                        </form></div>';
        CMS.classList.add(activeClass);

        // Save the changes
        CMS.querySelector("[data-save]").addEventListener("click", e => {
            e.preventDefault();

            CMS.classList.add(loadingClass);

            let url = ( window.location.pathname == '/') ? '/home/' : window.location.pathname.substr(-1) === '/' ?  window.location.pathname :  window.location.pathname + "/";
            let keywords = CMS.querySelector("[data-keywords]").value;
            let description = CMS.querySelector("[data-description]").value;
            
            const success = (data) => {
                CMS.querySelector(".cms__inner").innerHTML = '<div class="cms__text">Settings updated</div>';
                setTimeout(() => {
                    Close(true);
                }, 2000);
            }
    
            const error = () => {
                console.log("ERROR");
            }
    
            FetchAPI(url + 'settings', 'POST', {keywords, description}, success, error);
        });

        // Save the changes
        CMS.querySelector("[data-cancel]").addEventListener("click", e => {
            e.preventDefault();
            Close();
        });
    }; 
    

    /**
     * EDITORS
     * Find all editable elements, and add an event listenter
     * 
     */
    EDITORS.forEach(x => {
        x.addEventListener("click", e => EDITOR_UPDATE(x));
    });


    /**
     * BUILD
     * When the user clicks the build button, call the endpoint
     * to build the static site
     * 
     */
    BUILD.addEventListener("click", e => {
        CMS.innerHTML = '<div class="cms__inner cms__inner--build">\
                            <div class="cms__text">Building site...</div>\
                        </div>';
        CMS.classList.add(activeClass);

        const success = (data) => {
            CMS.querySelector(".cms__text").innerHTML = "Build complete!";
            setTimeout(() => {
                Close();
            }, 2000);
        }

        const error = () => {
            console.log("ERROR");
        }

        FetchAPI('/home/build', 'POST', {}, success, error);
    }); 


    /**
     * SETTINGS
     * Allows the user to update the meta descrption and meta keywords
     * 
     */
     SETTINGS.addEventListener("click", e => {
        e.preventDefault(); 
        SETTINGS_UPDATE();
     });

})();