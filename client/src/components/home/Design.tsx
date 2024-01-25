import React, { useState, useEffect, useRef } from 'react';
import BaseSidebar from './BaseSidebarDesign';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faList, faImage, faFont, faPencil, faCopy, faTrash, faUpload, faBold, faUnderline, faItalic, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { fabric } from 'fabric';
import WebFontConfig, { AvailableFontFamilies } from '../../contant/WebFontConfig';
import WebFont from 'webfontloader';
import { useSelector, useDispatch } from 'react-redux';
import { createImageAsset, getAllImageAsset } from '../../services/imageAssets.service';
import { uploadImageByS3 } from '../../store/actions/imageAction';
import HeaderDesign from './HeaderDesign';
import brushStroke1 from "../../assets/brushStroke1.svg"
import brushStroke2 from "../../assets/brushStroke2.svg"
import brushStroke3 from "../../assets/brushStroke3.svg"
import brushStroke4 from "../../assets/brushStroke4.svg"
import { validateAuth } from '../../store/actions/userAction';
import ModalPreview from './ModalPreview';
import { getRemoteImage } from '../../services/image.service';
import { cardEditById, cardInfoById, createCard, editCard, getListCard, resetCardEdit, resetCardInfo } from '../../store/actions/cardAction';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListBackground } from '../../store/actions/backgroundAction';
import { createNewImageAsset, getListImageAsset } from '../../store/actions/imageAssetAction';

interface Option {
    icon: IconProp;
    name: string;
    active: boolean;
}

// Define the React functional component
const Card: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cardId = useParams().id
    const userInfo = useSelector((state: any) => state.userReducer.userInfo);
    const cardEdit = useSelector((state: any) => state.cardReducer.cardEdit);
    const cardInfo = useSelector((state: any) => state.cardReducer.cardInfo);
    const backgrounds = useSelector((state: any) => state.backgroundReducer.backgrounds)
    const imageAssets = useSelector((state: any) => state.imageAssetReducer.imageAssets)

    const email = userInfo.email

    // console.log("cardInfo: ", cardInfo);
    const canvasRef: any = useRef(null);
    const [dispatchCompleted, setDispatchCompleted] = useState(false);

    const [strokeDrawing, setStrokeDrawing] = useState([
        { stroke: '20', image: brushStroke1, active: false },
        { stroke: '15', image: brushStroke2, active: false },
        { stroke: '10', image: brushStroke3, active: false },
        { stroke: '5', image: brushStroke4, active: false },
    ]);

    const [titleOption, setTitleOption] = useState('Background');
    const [contentOption, setContentOption] = useState<any[]>([]);
    const [optionCard, setOptionCard] = useState<Option[]>([
        { icon: faList, name: 'Background', active: true },
        { icon: faImage, name: 'Ảnh của tôi', active: false },
        { icon: faFont, name: 'Thêm chữ', active: false },
        { icon: faPencil, name: 'Vẽ', active: false },
    ]);
    const [isBoxEditText, setIsBoxEditText] = useState<boolean>(false);
    const [isImage, setIsImage] = useState<boolean>(true);
    const [isBoldText, setIsBoldText] = useState(false);
    const [isItalicText, setIsItalicText] = useState(false);

    const [textCard, setTextCard] = useState({
        textColor: '#000000',
        bgColor: '#ffffff',
        fontFamily: 'Roboto',
        fontSize: '40',
        textAlign: '',
        underline: false,
        fontWeight: '',
        fontStyle: '',
    });
    const [fontFamilyOptions, setFontFamilyOptions] = useState<String[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [type, setType] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [imgPreview, setImgPreview] = useState('')

    const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token: any = localStorage.getItem('token');
            if (token) {
                await dispatch(validateAuth(token) as any);
            }
            if (cardId) {
                await dispatch(cardEditById(cardId) as any);
                await dispatch(cardInfoById(cardId) as any);
            }
            if (email) {
                await dispatch(getListImageAsset({ email: email }) as any)
            }
            await dispatch(getListBackground() as any)
            setDispatchCompleted(true);
        };
        fetchData();
    }, [dispatch, cardId]);

    useEffect(() => {
        if (dispatchCompleted) {
            const canvas = initCanvas();

            canvas.on('after:render', () => {
                // Bắt đầu sử dụng canvas sau khi đã được render hoàn toàn
                // Lưu canvas vào ref để có thể sử dụng ở những nơi khác
                canvasRef.current = canvas;
                handleEvents();
                setIsCanvasInitialized(true);
            });
            setContentOption(backgrounds);
            setFontFamilyOptions(AvailableFontFamilies);
            WebFont.load(WebFontConfig);
        }
    }, [dispatchCompleted]);

    useEffect(() => {
        // Kiểm tra xem canvas đã được khởi tạo hay chưa
        if (isCanvasInitialized) {
            const activeObject: any = canvasRef.current.getActiveObject();
            if (activeObject) {
                activeObject.set({
                    fill: textCard.textColor,
                    backgroundColor: textCard.bgColor,
                    fontSize: parseInt(textCard.fontSize),
                    underline: textCard.underline,
                    fontWeight: textCard.fontWeight,
                    fontStyle: textCard.fontStyle,
                    textAlign: textCard.textAlign,
                    fontFamily: textCard.fontFamily,
                });
                canvasRef.current.requestRenderAll();
            }
        }
    }, [textCard, isCanvasInitialized]);

    useEffect(() => {
        setContentOption(imageAssets)
    }, [imageAssets]);

    const initCanvas = () => {
        console.log("cardEdit: ", cardEdit);
        const canvas = new fabric.Canvas(canvasRef.current, {
            preserveObjectStacking: true,
            width: 330,
            height: 480,
            backgroundColor: 'white',
            selection: false,
        })
        // Kiểm tra xem cardEdit có giá trị hay không
        if (cardEdit !== "") {
            // Tải dữ liệu JSON từ cardEdit lên đối tượng canvas đã được khởi tạo trước đó
            canvas.loadFromJSON(cardEdit, () => {
                canvas.renderAll();
            });
        }
        console.log("canvas:", canvas);
        return canvas;
    };

    const onMoveOption = async (id: number, name: string) => {
        const updatedOptionCard = optionCard.map((el, i) => {
            return { ...el, active: i === id ? true : false };
        });
        setOptionCard(updatedOptionCard);
        setTitleOption(name);

        if (name === 'Background') {
            setIsImage(true);
            setIsBoxEditText(false)
            setContentOption(backgrounds);
        } else if (name === 'Ảnh của tôi') {
            setIsBoxEditText(false)
            setIsImage(true);
            // const imageAsset = await getAllImageAsset({ email: email });
            // console.log(imageAsset.data.data);
            setContentOption(imageAssets);
        } else if (name === 'Thêm chữ') {
            setIsImage(false);
            setContentOption([])
            setIsBoxEditText(true)
            addHeading()
        } else if (name === 'Vẽ') {
            setIsImage(false);
            setIsBoxEditText(false)
            setContentOption([])
        } else {
            setContentOption([])
        }
    };

    const uploadImageAsset = async (e: any) => {
        const fileInput = e.target
        // console.log(fileInput);
        if (fileInput) {
            try {
                const upload = await dispatch(uploadImageByS3(fileInput) as any)
                console.log('upload is: ', upload);
                const imageUrl = upload.data.data.Location;

                // console.log(imageUrl);

                const data = {
                    email: email,
                    imageUrl: imageUrl,
                    filename: userInfo.username,
                }

                // await createImageAsset({
                //     email: email,
                //     imageUrl: imageUrl,
                //     filename: userInfo.username,
                // });

                // console.log(email);
                // const imageAsset = await getAllImageAsset({ email: email });
                // console.log("imageasset: ", imageAsset)
                // setTimeout(() => {
                //     setContentOption(imageAsset.data.data);
                //     console.log('update image success');
                // }, 1000);

                await dispatch(createNewImageAsset(data) as any)
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    };

    const addHeading = () => {
        const text = new fabric.IText('Chỉnh sửa tôi!', {
            type: 'text',
            fontFamily: 'Roboto',
            opacity: 1,
            shadow: undefined,
            visible: true,
            backgroundColor: '#ffffff',
            fillRule: 'nonzero',
            paintFirst: 'fill',
            fill: 'black',
            globalCompositeOperation: 'source-over',
            skewX: 0,
            skewY: 0,
            lineHeight: 1.16,
            overline: false,
            linethrough: false,
            textAlign: 'left',
            textBackgroundColor: '',
            charSpacing: 0,
            width: 300,
            styles: {},
            selectable: true
        });
        console.log('text : ', text);
        text.editable = true;
        canvasRef.current.add(text)
    }

    const changeTextStyle = (style: string) => {
        switch (style) {
            case 'underline':
                setTextCard((prevTextCard) => ({
                    ...prevTextCard,
                    underline: !prevTextCard.underline,
                }));
                break;
            case 'bold':
                setIsBoldText((prevIsBoldText) => !prevIsBoldText);
                setTextCard((prevTextCard) => ({
                    ...prevTextCard,
                    fontWeight: isBoldText ? 'bold' : '',
                }));
                break;
            case 'italic':
                setIsItalicText((prevIsItalicText) => !prevIsItalicText);
                setTextCard((prevTextCard) => ({
                    ...prevTextCard,
                    fontStyle: isItalicText ? 'italic' : '',
                }));
                break;
            case 'align-left':
                setTextCard((prevTextCard) => ({
                    ...prevTextCard,
                    textAlign: 'left',
                }));
                break;
            case 'align-right':
                setTextCard((prevTextCard) => ({
                    ...prevTextCard,
                    textAlign: 'right',
                }));
                break;
            case 'align-center':

                setTextCard((prevTextCard) => ({
                    ...prevTextCard,
                    textAlign: 'center',
                }));
                break;
            case 'align-justify':

                setTextCard((prevTextCard) => ({
                    ...prevTextCard,
                    textAlign: 'justify',
                }));
                break;
            default:
                break;
        }
    };

    const handleEvents = () => {
        canvasRef.current.on('selection:created', () => {
            console.log('Selection created');
            handleSelection(canvasRef.current);
        });

        canvasRef.current.on('selection:updated', () => {
            console.log('Selection updated');
            handleSelection(canvasRef.current);
        });

        canvasRef.current.on('selection:cleared', () => {
            console.log('Selection cleared');
            setIsBoxEditText(false);
        });
    };

    const handleSelection = (canvas: any) => {
        const activeObject = canvas.getActiveObject();
        console.log(activeObject);
        if (activeObject && activeObject.type === 'text') {
            // Cho phép chỉnh sửa nội dung trực tiếp
            // activeObject.set({ editable: true, editing: true });
            setIsBoxEditText(true);
            setTextCard({
                textColor: activeObject.fill,
                bgColor: activeObject.backgroundColor,
                fontSize: activeObject.fontSize,
                textAlign: activeObject.textAlign,
                underline: activeObject.underline,
                fontWeight: activeObject.fontWeight,
                fontStyle: activeObject.fontStyle,
                fontFamily: activeObject.fontFamily,
            });
        } else {
            setIsBoxEditText(false);
        }
        // console.log('canvas value:', activeObject);
    };

    const copySelectedObject = () => {
        const activeObject = canvasRef.current.getActiveObject();
        const copyObject = fabric.util.object.clone(activeObject)
        copyObject.set('top', copyObject.top + 20);
        copyObject.set('left', copyObject.left + 20);
        canvasRef.current.add(copyObject)
        canvasRef.current.setActiveObject(copyObject);
        canvasRef.current.requestRenderAll();
    }

    const deleteSelectedObject = () => {
        const activeObject = canvasRef.current.getActiveObject();
        if (activeObject) {
            canvasRef.current.remove(activeObject);
            canvasRef.current.renderAll();
        }
    }

    const onClickImageUpload = async (image: any) => {
        const imageRemote = await getRemoteImage({
            url: image.image,
        });
        console.log('Clicked Upload image:', image);
        fabric.Image.fromURL(
            imageRemote.data,
            (img) => {
                img.set({
                    // selectable: false,
                    scaleX: 0.3,
                    scaleY: 0.3,
                });
                // canvas.add(img);
                // canvas.renderAll();
                canvasRef.current.add(img);
                canvasRef.current.renderAll();
            }
        );
    }

    const onClickStrokeDraw = (stroke: any) => {
        // Tạo một bản sao sâu của mảng strokeDrawing
        const updatedStrokeDrawing = strokeDrawing.map((item) => ({
            ...item,
            active: stroke.stroke === item.stroke ? !item.active : false,
        }));

        // Cập nhật state với bản sao đã được cập nhật
        setStrokeDrawing(updatedStrokeDrawing);

        // Cập nhật trạng thái vẽ
        setIsDrawing(!isDrawing);

        // Tạo một brush mới cho việc vẽ
        const pencilBrush = new fabric.PencilBrush(canvasRef.current);
        pencilBrush.color = 'black';
        pencilBrush.width = parseInt(stroke.stroke);

        // Kích hoạt hoặc tắt chế độ vẽ
        canvasRef.current.isDrawingMode = !canvasRef.current.isDrawingMode;
        canvasRef.current.freeDrawingBrush = pencilBrush;

        // Xử lý sự kiện khi người dùng nhả chuột
        canvasRef.current.on('mouse:up', () => {
            canvasRef.current.isDrawingMode = false;
        });
    };

    const onClickImageBackground = async (background: any) => {
        const imageRemote = await getRemoteImage({
            url: background.image,
        });
        console.log("background: ", background);

        // console.log('Clicked Upload image:', imageRemote.data);
        canvasRef.current.clear();
        fabric.Image.fromURL(
            imageRemote.data,
            (img) => {
                img.scaleToWidth(canvasRef.current.width);
                img.scaleToHeight(canvasRef.current.height);
                img.set({ selectable: false });
                canvasRef.current.add(img).centerObject(img)
                canvasRef.current.renderAll();
            }
        );
    }

    const openModalSave = () => {
        setType("save");
        setShowModal(true);

        const img = new Image();
        img.crossOrigin = "Anonymous";

        img.src = canvasRef.current.toDataURL({ format: 'png', quality: 1 });
        img.onload = () => {
            // Đặt hình ảnh xem trước dựa trên trạng thái visible của đối tượng
            setImgPreview(img.src)
        };
    }

    const openModalPreview = () => {
        setType("preview");
        setShowModal(true);

        const img = new Image();
        img.crossOrigin = "Anonymous";

        // Chờ canvas vẽ hoàn tất
        img.src = canvasRef.current.toDataURL('image/png');

        console.log(img.src);

        img.onload = () => {
            setImgPreview(img.src);
        };
    };

    const closeModal = () => {
        setShowModal(false)
    }

    const saveDesign = async (payload: any) => {
        const json = canvasRef.current?.toJSON();
        const objectCanvas = JSON.parse(JSON.stringify(json));
        console.log("objectCanvas: ", objectCanvas);

        console.log(payload);

        if (payload.name === "" || payload.description === "" || payload.price === "" || payload.status === "") {
            toast.error("Bạn chưa nhập đủ thông tin", {
                position: toast.POSITION.TOP_CENTER,
            });
        }

        const params = {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            owner: userInfo.id,
            creator: userInfo.id,
            objects: objectCanvas.objects,
            thumbnail: imgPreview,
            role: payload.status.type,
        };

        console.log(params);

        if (cardId) {
            if (payload.name !== "" && payload.description !== "" && payload.price !== "" && payload.status !== "") {
                const update = await dispatch(editCard(cardId, params) as any)
                if (update.data.status === "success") {
                    closeModal()
                    toast.success("Cập nhật thông tin thiệp thành công!", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
        } else {
            if (payload.name !== "" && payload.description !== "" && payload.price !== "" && payload.status !== "") {
                const create = await dispatch(createCard(params) as any)
                console.log(create);
                if (create.data.status === "success") {
                    toast.success("Lưu thông tin thiệp thành công !", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    closeModal()
                }
            }
        }
    }

    const handleBack = () => {
        console.log("Back");
        dispatch(resetCardEdit() as any)
        dispatch(resetCardInfo() as any)
        dispatch(getListCard() as any)
        navigate("/")
    }

    // Sự kiện popstate có thể không được kích hoạt khi sử dụng React Router
    // Nên không thể truyền handBack trực tiếp

    useEffect(() => {
        const back = () => {
            handleBack()
        }
        window.addEventListener('popstate', back);
        return () => {
            window.removeEventListener('popstate', () => back);
        };
    }, []);

    return (
        <div className="card">
            {/* Header */}
            <HeaderDesign
                openModalSave={openModalSave}
                previewDesign={openModalPreview}
                onMoveHome={handleBack}
            />
            <div className="swap flex w-[100%] h-[90vh]">
                {/* Sidebar */}
                <div className="swap-sidebar w-fit min-w-[8%] border-slate-200 border">
                    {optionCard.map((option, id) => (
                        <div
                            key={id}
                            className={`swap-sidebar__option p-2 py-6 cursor-pointer grid place-items-center ${option.active ? 'border-r-2 border-sky-500' : ''}`}
                            onClick={() => onMoveOption(id, option.name)}
                        >
                            <FontAwesomeIcon icon={option.icon} className='text-xl' />
                            <div className={`text-sm p-1 ${option.active ? 'text-sky-500' : ''}`}>{option.name}</div>
                        </div>
                    ))}
                </div>

                {/* BaseSidebar */}
                <BaseSidebar
                    title={titleOption}
                    content={contentOption}
                    isImage={isImage}
                    strokeDrawing={strokeDrawing}
                    onClickImageUpload={onClickImageUpload}
                    onClickStrokeDraw={onClickStrokeDraw}
                    onClickImageBackground={onClickImageBackground}
                >
                    <div className="inline-block ">
                        <label className="w-32 h-[100px] swap-sidebar__option p-4 cursor-pointer grid place-items-center border-dashed border-2 border-indigo-600 rounded-md">
                            <FontAwesomeIcon icon={faUpload} />
                            <div className="text-sm p-1">Upload</div>
                            <input style={{ display: 'none' }} placeholder="Chọn tệp" type="file" accept=".png" onChange={(e) => uploadImageAsset(e)} multiple />
                        </label>
                    </div>
                </BaseSidebar>

                {/* Canvas */}
                <div className="swap-card relative bg-slate-100 w-[67%] h-[93vh]">
                    <div className="card-nav bg-slate-100 w-[100%] h-[60px] flex justify-center items-center">
                        {/* Tool Text */}
                        {isBoxEditText
                            ?
                            (
                                <div className="container  max-w-max mx-aut rounded-lg overflow-hidden">
                                    <div className="toolbar pl-1">
                                        <div className="btn-toolbar flex flex-wrap items-center">
                                            <select
                                                className="mr-3 w-[115px] h-10 bg-white border border-gray-400 rounded outline-none cursor-pointer"
                                                value={textCard.fontFamily}
                                                onChange={(e) => setTextCard((prevTextCard) => ({
                                                    ...prevTextCard,
                                                    fontFamily: e.target.value
                                                }))}
                                            >
                                                {fontFamilyOptions.map((fontFamily: any, idx) => (
                                                    <option key={idx} style={{ fontFamily }}>
                                                        {fontFamily}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="mr-3 h-10 color bg-white border border-gray-400 rounded outline-none cursor-pointer flex items-center gap-2 px-2">
                                                <span>Color</span>
                                                <input
                                                    type="color"
                                                    value={textCard.textColor}
                                                    onChange={(e) => setTextCard((prevTextCard) => ({
                                                        ...prevTextCard,
                                                        textColor: e.target.value
                                                    }))}
                                                />
                                            </div>
                                            <div className="me-3 h-10 color bg-white border border-gray-400 rounded outline-none cursor-pointer flex items-center gap-2 px-2">
                                                <span>Background</span>
                                                <input
                                                    type="color"
                                                    value={textCard.bgColor}
                                                    onChange={(e) => setTextCard((prevTextCard) => ({
                                                        ...prevTextCard,
                                                        bgColor: e.target.value
                                                    }))}
                                                />
                                            </div>
                                            <select
                                                className="mr-3 h-10 bg-white border border-gray-400 rounded outline-none cursor-pointer"
                                                value={textCard.fontSize}
                                                onChange={(e) => setTextCard((prevTextCard) => ({
                                                    ...prevTextCard,
                                                    fontSize: e.target.value
                                                }))}
                                            >
                                                <option value="20">Extra small</option>
                                                <option value="35">Small</option>
                                                <option value="40">Regular</option>
                                                <option value="44">Medium</option>
                                                <option value="48">Large</option>
                                                <option value="55">Extra Large</option>
                                                <option value="60">Big</option>
                                            </select>
                                            <div className="flex mr-3">
                                                <button
                                                    className="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
                                                    onClick={() => changeTextStyle('bold')}
                                                >
                                                    <FontAwesomeIcon icon={faBold} />
                                                </button>
                                                <div
                                                    className="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
                                                    onClick={() => changeTextStyle('underline')}
                                                >
                                                    <FontAwesomeIcon icon={faUnderline} />
                                                </div>
                                                <button
                                                    className="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
                                                    onClick={() => changeTextStyle('italic')}
                                                >
                                                    <FontAwesomeIcon icon={faItalic} />
                                                </button>
                                            </div>
                                            <div className="flex mr-3">
                                                <button
                                                    className="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
                                                    onClick={() => changeTextStyle('align-left')}
                                                >
                                                    <FontAwesomeIcon icon={faAlignLeft} />

                                                </button>
                                                <button
                                                    className="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
                                                    onClick={() => changeTextStyle('align-right')}
                                                >
                                                    <FontAwesomeIcon icon={faAlignRight} />
                                                </button>
                                                <button
                                                    className="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
                                                    onClick={() => changeTextStyle('align-center')}
                                                >
                                                    <FontAwesomeIcon icon={faAlignCenter} />
                                                </button>
                                                <button
                                                    className="bg-white border border-gray-400 rounded cursor-pointer w-10 h-10 flex items-center justify-center text-xl p-[10px]"
                                                    onClick={() => changeTextStyle('align-justify')}
                                                >
                                                    <FontAwesomeIcon icon={faAlignJustify} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            (
                                <div className='bg-white h-[50px]'></div>
                            )}
                        {/* ... */}
                    </div>

                    {/* Canvas Content */}
                    <div className="fit-h flex justify-center mx-12 pt-2 pl-0">
                        <div className="w-[100%] fit-w flex justify-center ">
                            <div className="w-[1000px] flex justify-center">
                                <canvas
                                    ref={canvasRef}
                                    className='shadow-2xl border-[2px] rounded-2xl'
                                >
                                    {/* <img src={testImage} alt="image" /> */}
                                </canvas>
                            </div>
                            <div className="w-[60px] h-[100%] rounded p-2 flex justify-center items-center flex-col">
                                <div onClick={copySelectedObject} className="w-[100%] cursor-pointer rounded border-2 p-1 shadow-lg bg-white">
                                    <FontAwesomeIcon icon={faCopy} className="ml-[2px]" />
                                </div>
                                <div onClick={deleteSelectedObject} className="w-[100%] cursor-pointer rounded border-2 p-1 shadow-lg bg-white mt-2 ">
                                    <FontAwesomeIcon icon={faTrash} className="ml-[2px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPreview
                showModal={showModal}
                type={type}
                imgPreview={imgPreview}
                cardInfo={cardInfo}
                CloseModal={closeModal}
                saveDesign={saveDesign}
            />
        </div>
    );
}

export default Card;
