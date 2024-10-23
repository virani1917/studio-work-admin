import { AdminService } from "./../../_services/admin.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AdminService: AdminService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.fectchTeamId();
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

  public newsObj: any = {
    name: "",
    image: "",
    redirection_link: "",
    youtube_video_link: "",
    description: "",
  };

  public coverIcon: any = null;

  public isteamSave: boolean = false;


//  Function for Fetching Project Id
fectchTeamId() {
  this.route.params.subscribe((params) => {
    if (params["slug"]) {
      let slug = params["slug"];
      this.getTeamdetails(slug);
    }
  });
}

// Project Detail Function for Fectching Detail While Edit
getTeamdetails(slug) {
  this.AdminService.newsDetail({slug : slug}).subscribe((response: any) => {
    if (response.success == 1) {
      this.newsObj = response.news;
      console.log(this.newsObj)
    }else {
      this.router.navigate(["/news"]);        
    }
  });
}

//  Cover Icon Preiew Function
onCoverIconChange(event) {
  var file = event.srcElement.files[0];
  if (typeof file.type != "undefined") {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.coverIcon = e.target.result;
    };
    this.newsObj.image = file;
    reader.readAsDataURL(file);
  }
}

removeImage(){
  this.newsObj.image = "";
  this.newsObj.remove_image = "delete";
}

addNews(form) {

  let formdata = new FormData();
  formdata.append("from_app", "true");


  for (let key in this.newsObj) {
    if (
      this.newsObj[key] !== undefined &&
      this.newsObj[key] !== null
    ) {
      formdata.append(key, this.newsObj[key]);
    }
  }
  if (this.isteamSave == false) {
    this.isteamSave = true;
    if (form.valid) {
      this.AdminService.addNews(formdata).subscribe((response: any) => {
        if (response.success === 1) {
          this.newsObj = {};
          this.isteamSave = false;
          this.router.navigate(["/news"]);
          this.toastr.success(response.message);
        } else {
          this.isteamSave = false;
          this.toastr.error(response.message);
        }
      });
    } else {
      this.isteamSave = false;
    }
  }
}

}
