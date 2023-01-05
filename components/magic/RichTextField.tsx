import { FormControl } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useEffect, useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import { Controller, get, UseFormReturn } from 'react-hook-form';

import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'

// install @types/draft-js @types/react-draft-wysiwyg and @types/draft-js @types/react-draft-wysiwyg for types

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

// const { ContentState, convertFromHTML, EditorState }: any = dynamic(
//     () => import('draft-js'),
//     { ssr: false }
// )

interface Props {
    hookForm: UseFormReturn<any>;
    label: string;
    name: string;
    highlight?: boolean;
}

const RichTextField = ({
    hookForm: {
        formState: { touchedFields, errors },
        control,
        setValue,
        watch
    },
    label,
    name = '',
    highlight = false,
    ...otherProps
}: Props) => {
    // const blocksFromHtml = convertFromHTML(watch(name));
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // const editorStateInit = EditorState.createWithContent(contentState);
    const [editorState, setEditorState] = useState<any>(null);
    useEffect(() => {
        console.log('watch name: ', watch(name))
        const blocksFromHtml = convertFromHTML('Hey this editor rocks 😀');
        console.log('blocksFromHtml: ', blocksFromHtml);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorStateInit = EditorState.createWithContent(contentState);
        setEditorState(editorStateInit);
    }, [])

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <FormControl
                    fullWidth
                    error={get(errors, name)}
                    sx={{
                        border: 'solid rgba(0, 0, 0, 0.26) 1px',
                        padding: 1,
                        borderRadius: 1
                    }}
                >
                    <InputLabel htmlFor={name} color="secondary" shrink sx={{ background: 'white', px: 0.5 }}>
                        {label}
                    </InputLabel>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(x) => {
                            setEditorState(x);
                        }}
                        onChange={(e) => {
                            console.log(draftToHtml(e));
                            setValue(name, draftToHtml(e));
                        }}
                        customBlockRenderFunc={(e) => {
                            return <></>;
                        }}
                    />
                    {get(errors, name) && (
                        <FormHelperText error id={`${name}-error`}>
                            {get(get(errors, name), 'message', '')}
                        </FormHelperText>
                    )}
                </FormControl>
                // <TextField
                //     {...field}
                //     fullWidth
                //     error={get(errors, name)}
                //     helperText={_.get(get(errors, name), 'message', '')}
                //     {...otherProps}
                //     label={label}
                //     id={name}
                //     name={name}
                //     sx={{
                //         ...otherProps.sx,
                //         '.MuiOutlinedInput-notchedOutline': {
                //             borderColor: highlight ? '#1890FF !important' : 'inherit'
                //         },
                //         '.Mui-disabled': {
                //             color: highlight ? '#1890FF !important' : ''
                //         }
                //     }}
                // />
            )}
        />
    );
};

export default RichTextField;
