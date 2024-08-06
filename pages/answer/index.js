import React, { useState } from 'react'
import { allanswer, deleteanswer } from '../apicall/apicall'
import { useQuery } from '@tanstack/react-query' // Import for useQuery
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2'; // Import Sweet Alert
import Link from 'next/link';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const index = () => {

    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState(''); // For Search Customer

    // Get Answer For Use Query 
    const getAnswer = async () => {
        const response = await dispatch(allanswer()) // Call allanswer function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: answerdata, error, refetch } = useQuery({
        queryKey: ['answer'],
        queryFn: getAnswer // This line of code work as same as useEffect()
    })

    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Question and Answer!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await dispatch(deleteanswer(id));
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Question and Answer has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)

    // Handle For Search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter products based on search query
    const filteredAnswer = Array.isArray(answerdata) && answerdata?.filter((answerdata) =>
        answerdata.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            {/* <!-- ======= Blog Section ======= --> */}
            <section id="blog" class="blog">
                <div class="container">

                    <div class="row">

                        <input
                            type="text"
                            placeholder="Search answer..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{
                                marginTop: '80px',
                                width: '100%',
                                padding: '15px',
                                borderRadius: '25px',
                                border: '1px solid #ccc',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                fontSize: '16px',
                                boxSizing: 'border-box',
                                backgroundImage: 'linear-gradient(to right, #ffffff, #f2f2f2)',
                                backgroundSize: '200% auto',
                                transition: 'background-position 0.5s ease',
                            }}
                        />

                        <div class="col-lg-12 entries">

                            {filteredAnswer?.slice(0, filteredAnswer.length)?.reverse()?.map((value) => {
                                return (
                                    <>
                                        <article class="entry" data-aos="fade-up">
                                            <h2 class="entry-title">
                                                <a href="blog-single.html">{value?.question}</a>
                                            </h2>

                                            <div class="entry-content">
                                                <p>
                                                    {value?.answer}
                                                </p>
                                            </div>
                                            <button onClick={() => handleDelete(value.id)} className='btn-danger'><DeleteIcon /></button>
                                            <Link href={`/edit/${value.id}`} style={{ marginLeft: '10px' }}>
                                                <button className='btn-danger' ><EditIcon /></button>
                                            </Link>
                                        </article>

                                    </>
                                )
                            })}


                        </div>



                    </div>

                </div>
            </section>
            {/* <!-- End Blog Section --> */}
        </>
    )
}

export default index
