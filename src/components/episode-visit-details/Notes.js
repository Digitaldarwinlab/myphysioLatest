import React from "react";
import FormTextArea from './../UI/antInputs/FormTextArea';
import { Form, Button, Row, Spin, Pagination } from "antd";
import Success from './../UtilityComponents/SuccessHandler';
import Error from './../UtilityComponents/ErrorHandler';
import { Add_Notes, getNotes } from './../../API/Notes/Notes';

const Notes = (props) => {
    const [notes, setNotes] = React.useState("");
    const [form] = Form.useForm();
    const [AllNotes, setAllNotes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState("");
    const [change, setChange] = React.useState(false);
    const [paginationState, setPaginationState] = React.useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        pageSize: 5
    });

    React.useEffect(() => {
        async function callGetNotes() {
            setIsLoading(true);
            let data = await getNotes(props.eid);
            let newData = data.map((val) => {
                return val.notes;
            });
            let newDataNotes = [];
            for (let i = 0; i < newData.length; i++) {
                newDataNotes.push(newData[i][0]);
            }
            setAllNotes(newDataNotes);
            setPaginationState({
                ...paginationState,
                totalPage: newDataNotes.length / paginationState.pageSize,
                minIndex: 0,
                maxIndex: paginationState.pageSize,
            })
            setIsLoading(false);
        }
        callGetNotes();
        // eslint-disable-next-line
    }, [change, props.eid]);
    //handleNotes Finish
    const handleNotesFinish = async () => {
        if (props.eid === "") {
            setError("Please Select a Patient or Create an Episode.");
            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }
        setIsLoading(true);
        let data = {
            eid: props.eid,
            notes: [
                {
                    date: new Date().toISOString().slice(0, 10),
                    note: notes
                }
            ]
        };
        let result = await Add_Notes(data);
        setIsLoading(false);
        if (result && result[0]) {
            setSuccess("Note Added Successfully.");
            setNotes("");
            form.resetFields();
            setChange(!change)
        } else {
            setError(result[1]);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }
    //Page change
    const PaginationChange = (page, pageSize = paginationState.pageSize) => {
        setPaginationState({
            ...paginationState,
            pageSize: pageSize,
            total: AllNotes.length / pageSize,
            current: page,
            minIndex: (page - 1) * (pageSize),
            maxIndex: page * (pageSize)
        })
    }
    return (
        <>
            <Form onFinish={handleNotesFinish} form={form} name="control-hooks" className="px-2 py-2">
                {success && <Success success={success} />}
                {error && <Error error={error} />}
                <FormTextArea
                    name="notes" label=""
                    placeholder="Enter Your Notes..."
                    value={notes}
                    onChange={(name, value) => setNotes(value)}
                    required={true}
                />
                <div className="text-end">
                    <Button className="btncolor m-2" htmlType="submit">Submit</Button>
                </div>
            </Form>
            <Row className="mt-3 px-2 py-2">
                {isLoading &&
                    (<div style={{ margin: "10px auto" }}><Spin tip="Loading..." size="large"></Spin>
                    </div>)}
                {AllNotes.length === 0 && !isLoading && <p>No Notes are Present...</p>}
                {
                    AllNotes.length !== 0 &&
                    AllNotes.map((val, index) =>
                        index >= paginationState.minIndex && index < paginationState.maxIndex
                        && (<div className="border m-1 px-2 py-2 w-100" key={index}>
                            <p className="fw-bold">{val.note}</p>
                            <p>{val.date}</p>
                        </div>
                        ))
                }
            </Row>
            <div className="text-end">
                <Pagination
                    className="m-2"
                    pageSize={paginationState.pageSize}
                    current={paginationState.current}
                    total={AllNotes.length}
                    showSizeChanger
                    pageSizeOptions={["5", "10", "20", "50", "100"]}
                    onChange={PaginationChange}
                />
            </div>
        </>
    );
}
export default Notes;