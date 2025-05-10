import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ currentPage, setPage, totalItems, itemsPerPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  // Chỉ hiển thị các trang gần trang hiện tại
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pageNumbers.push(i);
    } else if (
      (i === currentPage - 3 && i > 1) ||
      (i === currentPage + 3 && i < totalPages)
    ) {
      pageNumbers.push('...');
    }
  }

  const handlePageChange = (number) => {
    if (number !== '...') {
      setPage(number);
    }
  };

  return (
    <View style={styles.paginationContainer}>
      {/* Trang trước */}
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === 1 && styles.disabledButton,
        ]}
        disabled={currentPage === 1}
        onPress={() => setPage(currentPage - 1)}
      >
        <Text style={styles.paginationText}>Trước</Text>
      </TouchableOpacity>

      {/* Các số trang */}
      {pageNumbers.map((number, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paginationButton,
            currentPage === number && styles.activePage,
            number === '...' && styles.disabledButton,
          ]}
          disabled={number === '...'}
          onPress={() => handlePageChange(number)}
        >
          <Text style={styles.paginationText}>{number}</Text>
        </TouchableOpacity>
      ))}

      {/* Trang sau */}
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        disabled={currentPage === totalPages}
        onPress={() => setPage(currentPage + 1)}
      >
        <Text style={styles.paginationText}>Sau</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    flexWrap: 'wrap',
  },
  paginationButton: {
    backgroundColor: '#ff6f3a', // Màu nền cam tươi
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20, // Bo góc
    marginHorizontal: 5,
    marginBottom: 8,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  activePage: {
    backgroundColor: '#28a745', // Màu xanh lá cho trang hiện tại
  },
  disabledButton: {
    backgroundColor: '#ddd', // Màu xám cho nút không bấm được
  },
});

export default Pagination;
