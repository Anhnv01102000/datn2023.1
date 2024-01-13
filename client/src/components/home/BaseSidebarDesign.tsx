import React, { useState } from 'react';

interface Props {
    children?: React.ReactNode;
    title: string;
    content: any[];
    isImage: boolean;
    strokeDrawing: { image: string; active: boolean }[];
    onClickImageUpload: (image: { image: string }) => void;
    onClickStrokeDraw: (stroke: { image: string }) => void;
    onClickImageBackground: (image: { image: string }) => void;
}

const BaseSidebar: React.FC<Props> = ({
    children,
    title,
    content,
    strokeDrawing,
    onClickImageUpload,
    onClickStrokeDraw,
    onClickImageBackground
}) => {

    return (
        <div className="sidebar-content bg-white w-[25%] border border-slate-200 p-2 pt-6 overflow-auto">
            {/* danamic components */}
            <div className="sidebar-content__detail text-left font-bold">
                <div className="detail-tiltle text-center px-4 pb-8 text-2xl">{title}</div>
                <div className="grid grid-cols-2 gap-1 auto-cols-fr grid-flow-dense">
                    {/* Upload */}
                    {title === 'Ảnh của tôi' && (
                        <>
                            <div>{children}</div>
                            {content.map((image, idx) => (
                                <div key={idx} className="w-full mb-5 break-inside-avoid">
                                    <img
                                        src={image.image}
                                        alt={`Image ${idx}`}
                                        className='max-w-full h-auto object-cover rounded-xl border-[2px] shadow'
                                        onClick={() => onClickImageUpload(image)}
                                    />
                                </div>
                            ))}
                        </>
                    )}

                    {/* Background */}
                    {title === 'Background' && (
                        <>
                            {content.map((image, idx) =>
                            (
                                <div key={idx} className="w-full mb-5 break-inside-avoid">
                                    <img
                                        src={image.image}
                                        alt={`Image ${idx}`}
                                        className='max-w-full h-auto object-cover rounded-xl border-[2px] shadow'
                                        onClick={() => onClickImageBackground(image)}
                                    />
                                </div>
                            )
                            )}
                        </>
                    )}

                    {/* Draw */}
                    {title === 'Vẽ' && (
                        <>
                            {strokeDrawing.map((stroke, idx) => (
                                <div
                                    key={idx}
                                    className={`w-full mb-5 break-inside-avoid ${stroke.active ? 'bg-slate-200 rounded' : ''}`}
                                >
                                    <img
                                        src={stroke.image}
                                        alt={`Image ${idx}`}
                                        className='max-w-full h-auto object-cover rounded-xl border-[2px] shadow'
                                        onClick={() => onClickStrokeDraw(stroke)}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BaseSidebar;