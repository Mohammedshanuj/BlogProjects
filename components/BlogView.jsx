import React, { useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Box, Stack, Typography } from '@mui/material'
import Ima from '../assets/icons/ima.png'
//import { Element, Leaf } from "./CreateBlog";
import MDEditor from "@uiw/react-md-editor";

function BlogView({ bold, italic, title, initialValue, value, variant, style, image }) {
    // console.log(value);
    // console.log(title);
    // const renderElement = useCallback(props => <Element {...props} />, []);
    // const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    // const editor = useMemo(() => withReact(createEditor()), []);
    return (
        <Box
            bgcolor='white'
            mt={2}
            border='1px white solid'
            p='20px'

            height='fit-content'>
            <Stack display='flex'
                flexDirection='row'
            >
                <img style={{ width: '240px', height: '300px' }} src={image ? image : Ima} alt="image" />
                <Stack alignItems='center' >

                    <Typography sx={{ ml: '40px', fontStyle: italic ? 'italic' : 'normal', fontWeight: bold ? 'bold' : 'normal' }}>{title ? title : 'Title'}</Typography>

                    {/* <Typography variant='h6' width='500px' height='300px' sx={{  ml: '50px', mt: '20px', wordBreak: 'break-all' }}>{value}</Typography> */}
                    <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', minWidth: '500px', minHeight: '250px' }} />
                    {/* <Slate inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }} editor={editor} value={value}>
                        <Editable
                            sx={{ color: 'white' }}
                            readOnly
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                        />
                    </Slate> */}
                </Stack>
            </Stack>
        </Box >
    )
}

export default BlogView
