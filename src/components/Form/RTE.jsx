import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import config from '../../config/config';

const RTE = ({ control, defaultValue }) => {
    return (
        <div>
            <Controller
                name="content"
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey={config.tinyApiKey}
                        value={value}
                        onEditorChange={onChange}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "advlist", "autolink", "lists", "link", "image", "charmap",
                                "preview", "anchor", "searchreplace", "visualblocks", "code",
                                "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }"
                        }}

                    />
                )}
            />
        </div>
    );
};

export default RTE;
