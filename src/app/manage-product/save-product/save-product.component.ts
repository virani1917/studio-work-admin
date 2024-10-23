import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.css']
})
export class SaveProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AdminService: AdminService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.fectchCategoryId();
    this. loadProductCategory();
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
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

  public productDetailObj: any = {
    id: "",
    category_id: "",
    name: "",
    sequence: "",
    dimensions: "",
    code: "",
    color: "",
    finish: "",
    tagline: "",
    description: "",
    sale_price: "",
    design_type: "",
    care_instructions: "",
    assembly: "",
    faqs: "",
    specifications: "",
    page_title: "",
    meta_keywords: "",
    meta_description: "",
    removeMedia:[]

  };

  public categoryList: any = [];
  loadCategory() {
    this.AdminService.loadCategory(this.productDetailObj).subscribe((response: any) => {
      if (response.success == 1) {
        this.categoryList = response.categories;
      } else {
        this.categoryList = [];
       
      }
    });
  }

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
        this.getProductdetails(slug); this.is_edit = true;
      } else {
        this.is_edit = false;
      }
    });
  }


  // Project Detail Function for Fectching Detail While Edit
  getProductdetails(slug) {
    this.AdminService.productDetail({ slug: slug }).subscribe((response: any) => {
      if (response.success == 1) {
        this.productDetailObj = response.product;
        this.productDetailObj.mediaGallery = this.productDetailObj.image;
        // if (!Array.isArray(this.productDetailObj.mediaGallery)) {
        // }
        this.mediaArray = [...this.productDetailObj.image];
        console.log(this.productDetailObj)
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
      this.productDetailObj.icon = file;
      reader.readAsDataURL(file);
    }
  }

  removeCoverIcon() {
    this.productDetailObj.icon = "";
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
      this.productDetailObj.image = file;
      reader.readAsDataURL(file);
    }
  }
  removeCoverImage() {
    this.productDetailObj.image = "";
    this.coverImage = '';
  }

  // Media Gallery Preiew Function
  onMediaChange(event: any) {
    // this.mediaArray = [];
    const files = event.target.files;
    this.productDetailObj.mediaGallery = [];
    for (let key in files) {
      const file = files[key];
      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (!this.mediaArray) {
            this.mediaArray = [];
          }
          this.mediaArray.push({ image: e.target.result });
          this.productDetailObj.mediaGallery.push(file);
        };
        reader.readAsDataURL(file);
      }
    }
  }


  

  // Media Gallery Remove Function
  removeMedia(index: number, removeId: any) {
    this.mediaArray.splice(index, 1);
    this.productDetailObj.mediaGallery.splice(index, 1);


    if (removeId) {
      if (!this.productDetailObj.removeMedia) {
        this.productDetailObj.removeMedia = [];
      }

      this.productDetailObj.removeMedia.push(removeId);
      console.log(this.productDetailObj.removeMedia);
    }
  }


  

  //Product Form Submit Funccion
  addProduct(form) {
    let formdata = new FormData();
    formdata.append("from_app", "true");

    if (this.productDetailObj.date) {

      this.productDetailObj.year = new Date(
        this.productDetailObj.date
      ).getFullYear();
    } else {
      this.productDetailObj.year = ''
    }


    for (let key in this.productDetailObj) {
      if (key === "mediaGallery" && this.productDetailObj.mediaGallery) {
        for (let i = 0; i < this.productDetailObj.mediaGallery.length; i++) {
          formdata.append(`image[${i}]`, this.productDetailObj.mediaGallery[i]);
        }
      } else if (
        this.productDetailObj[key] !== undefined &&
        this.productDetailObj[key] !== null
      ) {
        formdata.append(key, this.productDetailObj[key]);
      }
    }

    if (this.isprojectSave == false) {
      this.isprojectSave = true;
      if (form.valid) {
        this.AdminService.addProduct(formdata).subscribe((response: any) => {
          if (response.success === 1) {
            this.productDetailObj = {};
            this.isprojectSave = false;
            this.router.navigate(["/product-list"]);
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





  public productCategoryList:any = [];

  loadProductCategory() {
    this.AdminService.loadNestedCategory({}).subscribe((response: any) => {
      if (response.success == 1) {
        this.productCategoryList = response.categories;
      
      } else {
        this.categoryList = [];
      }
    });
  }
}
