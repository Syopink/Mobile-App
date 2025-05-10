// const SectionWithPagination = ({ title, data, page, setPage, navigation }) => {
//     return (
//       <>
//         <Text style={styles.sectionTitle}>{title}</Text>
//         <FlatList
//           data={data.slice((page - 1) * itemsPerPage, page * itemsPerPage)}
//           renderItem={({ item }) => (
//             <ProductCard
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={formatPrice(item.price)}
//               image={getImageProduct(item.image)}
//               onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
//             />
//           )}
//           keyExtractor={(item) => item._id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.productRow}
//           contentContainerStyle={{ gap: 12 }}
//         />
//         <Pagination
//           currentPage={page}
//           setPage={setPage}
//           totalItems={data.length}
//           itemsPerPage={itemsPerPage}
//         />
//       </>
//     );
//   };
// export default SectionWithPagination;  