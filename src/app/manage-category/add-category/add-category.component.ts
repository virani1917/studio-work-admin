import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AdminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadCategory();
    this.fectchCategoryId();
  }

  configEditor = {
    removeButtons:
      "Print,Preview,NewPage,Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,ImageButton,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About,FontSize,Image",
    toolbarGroups: [
      { name: "document", groups: ["mode", "document", "doctools"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
      },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      { name: "styles", groups: ["styles"] },
      { name: "paragraph", groups: ["list", "indent", "blocks"] },
      "/",
      { name: "clipboard", groups: ["clipboard", "undo"] },
      { name: "paragraph", groups: ["align", "bidi", "paragraph"] },
      { name: "forms", groups: ["forms"] },
      { name: "links", groups: ["links"] },
      { name: "colors", groups: ["colors"] },
      { name: "insert", groups: ["insert"] },
      "/",
      { name: "tools", groups: ["tools"] },
      { name: "others", groups: ["others"] },
      { name: "about", groups: ["about"] },
    ],
    removePlugins: "exportpdf",
  };

  public categoryDetailObj: any = {
    id: "",
    parent_id: "",
    category: "",
    image: "",
    icon: "",
    sort_order: "",
    page_title: "",
    meta_keywords: "",
    meta_description: ""

  };

  public coverIcon: any = null;
  public coverImage: any = null;
  public mediaArray: any[] = null;
  public isprojectSave: boolean = false;


  //  Function for Fetching Project Id
  is_edit = false;
  fectchCategoryId() {
    this.route.params.subscribe((params) => {
      if (params["slug"]) {
        let slug = params["slug"];
        this.getCategorydetails(slug);
        this.is_edit = true;
      } else {
        this.is_edit = false;
      }
      
    });
  }


  // Project Detail Function for Fectching Detail While Edit
  getCategorydetails(slug) {
    this.AdminService.categoryDetail({ slug: slug }).subscribe((response: any) => {
      if (response.success == 1) {
        this.categoryDetailObj = response.category;
        this.categoryDetailObj.mediaGallery = this.categoryDetailObj.image;
        // if (!Array.isArray(this.categoryDetailObj.mediaGallery)) {
        // }
        this.mediaArray = [...this.categoryDetailObj.image];
        console.log(this.categoryDetailObj)
      } else {
        this.router.navigate(["/category-list"]);
      }
    });
  }

  //Icon Preiew Function
  onCoverIconChange(event) {
    var file = event.srcElement.files[0];
    if (typeof file.type != "undefined") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverIcon = e.target.result;
      };
      this.categoryDetailObj.icon = file;
      reader.readAsDataURL(file);
    }
  }

  removeCoverIcon() {
    this.categoryDetailObj.icon = "";
    this.coverIcon = '';
  }


  //  Cover Image Preiew Function
  onCoverImageChange(event) {
    var file = event.srcElement.files[0];
    if (file && typeof file.type !== "undefined") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImage = e.target.result;
      };
      this.categoryDetailObj.image = file;
      reader.readAsDataURL(file);
    }
  }
  removeCoverImage() {
    this.categoryDetailObj.image = "";
    this.coverImage = '';
  }

  // Media Gallery Preiew Function
  onMediaChange(event: any) {
    // this.mediaArray = [];
    const files = event.target.files;
    this.categoryDetailObj.mediaGallery = [];
    for (let key in files) {
      const file = files[key];
      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (!this.mediaArray) {
            this.mediaArray = [];
          }
          this.mediaArray.push({ image: e.target.result });
          this.categoryDetailObj.mediaGallery.push(file);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Media Gallery Remove Function
  removeMedia(index: number, removeId: any) {
    this.mediaArray.splice(index, 1);
    this.categoryDetailObj.mediaGallery.splice(index, 1);


    if (removeId) {
      console.log(this.categoryDetailObj.removeMedia);
      if (!this.categoryDetailObj.removeMedia) {
        this.categoryDetailObj.removeMedia = [];
      }
      this.categoryDetailObj.removeMedia.push(removeId);

    }
  }

  //Project Form Submit Funccion
  addCategory(form) {
    if(form.valid){
      let formdata = new FormData();
      formdata.append("from_app", "true");
  
      if (this.categoryDetailObj.date) {
  
        this.categoryDetailObj.year = new Date(
          this.categoryDetailObj.date
        ).getFullYear();
      } else {
        this.categoryDetailObj.year = ''
      }
      // 
  
      for (let key in this.categoryDetailObj) {
        if (key === "mediaGallery" && this.categoryDetailObj.mediaGallery) {
          for (let i = 0; i < this.categoryDetailObj.mediaGallery.length; i++) {
            formdata.append(`image[${i}]`, this.categoryDetailObj.mediaGallery[i]);
          }
        } else if (key === "removeMedia" && this.categoryDetailObj.removeMedia) {
          formdata.append(
            "removeMedia",
            JSON.stringify(this.categoryDetailObj.removeMedia)
          );
        } else if (
          this.categoryDetailObj[key] !== undefined &&
          this.categoryDetailObj[key] !== null
        ) {
          formdata.append(key, this.categoryDetailObj[key]);
        }
      }
  
      if (this.isprojectSave == false) {
        this.isprojectSave = true;
        if (form.valid) {
          this.AdminService.addCategory(formdata).subscribe((response: any) => {
            if (response.success === 1) {
              this.categoryDetailObj = {};
              this.isprojectSave = false;
              this.router.navigate(["/category-list"]);
              this.toastr.success(response.message);
            } else {
              this.isprojectSave = false;
              this.toastr.error(response.message);
            }
          });
        } else {
          this.isprojectSave = false;
        }
      }
    }
  }

  public categoryList:any = [];

  loadCategory() {
    this.AdminService.loadNestedCategory({}).subscribe((response: any) => {
      if (response.success == 1) {
        this.categoryList = response.categories;
      
      } else {
        this.categoryList = [];
      }
    });
  }

}
