

const Category = async ({ params }: { params: { slug: string } }) => {


    return (
        <div>{params.slug}</div>
    )
}

export default Category