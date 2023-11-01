import { CategoriesType } from "../types";

type CategoriesPropsType = {
  categories: CategoriesType | undefined;
}

const Categorites = (props: CategoriesPropsType) => {
  const { categories } = props;
  return (
    <div className='category'>
      {
        (categories || []).map((item) => {
          return (
            <div className='category-item' key={item.id}>
              <img
                className='category-item-img'
                alt={item.name}
                src={item.imgUrl}
              />
              <p className='category-item-desc'>{item.name}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Categorites;