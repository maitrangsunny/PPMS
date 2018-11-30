import React, {
    Component
} from 'react';

import Dropzone from 'react-dropzone-component';
import Lightbox from 'react-images';
import Configs from '../../../../configs';
import Utils from "../../../../utils";

export default class WidgetAdd extends Component {
    constructor(props) {
        super(props);

        let banners = [];
        if (this.props.data && this.props.data.banner) {
            banners = this.props.data.banner.data;
        }



        this.state = {
            banners: banners,
            lightboxImages: banners.map(banner => ({
                src: banner.image
            })),
            lightboxIsOpen: false,
            lightboxIndex: 0,
            links: banners.map(banner => banner.link)
        };

        // console.log(this.props.data);
    }


    render() {
        return (
            <div>
                <header/>
                <fieldset>
                    <section className="col col-4">
                        <section>
                            <Dropzone
                                ref={(drop) => this.drop = drop}
                                config={{
                                    iconFiletypes: ['.jpg', '.png', '.gif'],
                                    showFiletypeIcon: true,
                                    postUrl: Configs.app['IMAGE_API'] + '/upload'
                                }}
                                djsConfig={{
                                    addRemoveLinks: true,
                                    dictRemoveFile: "Xoá file",
                                    dictRemoveFileConfirmation: "Bạn có chắc muốn xoá file này?"
                                }}
                                eventHandlers={{
                                    // complete:(file) => {
                                    //     console.log(file);
                                    // },
                                    complete: (file) => {
                                        let banners = this.state.banners;
                                        let response = JSON.parse(file.xhr.response);
                                        banners.push({
                                            image: Configs.app['IMAGE_API'] + "/file/" + response.fileName,
                                        });
                                        this.setState({
                                            banners: banners,
                                            lightboxImages: banners.map(banner => ({
                                                src: banner.image
                                            }))
                                        });
                                    },
                                    removedfile: (file) => {
                                        let response = file.xhr ? JSON.parse(file.xhr.response) : {
                                            fileName: file.image.replace('http://abc.9link.mobi/v1/file/', '')
                                        };

                                        // console.log(fileRemove);
                                        let files = this.state.banners;
                                        console.log(this.state.banners, response);

                                        this.setState({
                                            banners: files.filter(file => file.image !== Configs.app['IMAGE_API'] + "/file/" + response.fileName)
                                        })
                                    }
                                }}
                            />
                        </section>
                    </section>
                    <section className="col col-8">
                        {
                            this.state.banners.map((banner, i) =>
                                <fieldset key={"image_upload_" + banner.link + i}>
                                    <section className="col-lg-2">
                                        <img
                                            onClick={e => this.setState({
                                                lightboxIsOpen: true,
                                                lightboxIndex: i
                                            })}
                                            width={100}
                                            src={banner.image}
                                        />
                                    </section>
                                    <section className="col-lg-10">
                                        <section>
                                            <label className="label">Đường dẫn</label>
                                            <label className="input">
                                                <input type="hidden" name="images[]"
                                                       value={this.state.banners[i].image}
                                                    // onChange={e => {
                                                    //     let files = this.state.banners;
                                                    //     console.log(files);
                                                    //     files[i].link = e.target.value;
                                                    //     this.setState({
                                                    //         banners: files
                                                    //     })
                                                    // }}
                                                />
                                                <input type="text" name="links[]"
                                                       value={this.state.links[i] || ""}
                                                       onChange={e => {
                                                           let links = this.state.links;
                                                           links[i] = e.target.value;
                                                           this.setState({
                                                               links: links
                                                           })
                                                       }}
                                                />
                                            </label>
                                        </section>
                                        <section>
                                            <label className="input">
                                                <a className="btn btn-danger"
                                                   onClick={Utils.confirmBox.bind(this, "Xoá file", "Bạn có chắc muốn xoá file này?", () => this.drop.dropzone.emit('removedfile', banner), null)}
                                                >
                                                    <i className="fa fa-trash-o"/>
                                                    Xoá file
                                                </a>
                                            </label>
                                        </section>
                                    </section>
                                </fieldset>
                            )
                        }
                    </section>
                </fieldset>
                <Lightbox
                    images={this.state.lightboxImages}
                    isOpen={this.state.lightboxIsOpen}
                    onClose={() => this.setState({lightboxIsOpen: false})}
                    onClickPrev={() => this.setState({lightboxIndex: parseInt(this.state.lightboxIndex) - 1})}
                    onClickNext={() => this.setState({lightboxIndex: parseInt(this.state.lightboxIndex) + 1})}
                    currentImage={parseInt(this.state.lightboxIndex)}
                    imageCountSeparator={"/"}
                    // backdropClosesModal
                />
            </div>
        )
    }
}