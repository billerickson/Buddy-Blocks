cmake_minimum_required(VERSION 3.20)
project(buddy_blocks_host_tests LANGUAGES CXX)

enable_testing()

add_library(buddy_domain STATIC
  ../../components/buddy_domain/buddy_domain.cpp
)
target_include_directories(buddy_domain PUBLIC
  ../../components/buddy_domain/include
)
target_compile_features(buddy_domain PUBLIC cxx_std_17)
target_compile_options(buddy_domain PRIVATE -Wall -Wextra -Werror -fno-exceptions -fno-rtti)

add_executable(buddy_domain_tests buddy_domain_tests.cpp)
target_link_libraries(buddy_domain_tests PRIVATE buddy_domain)
target_include_directories(buddy_domain_tests PRIVATE "${CMAKE_BINARY_DIR}/generated")
target_compile_options(buddy_domain_tests PRIVATE -Wall -Wextra -Werror)
add_test(NAME buddy_domain_tests COMMAND buddy_domain_tests)

add_library(buddy_storage STATIC
  ../../components/buddy_storage/buddy_storage.cpp
)
target_include_directories(buddy_storage PUBLIC
  ../../components/buddy_storage/include
)
target_compile_features(buddy_storage PUBLIC cxx_std_17)
target_compile_options(buddy_storage PRIVATE -Wall -Wextra -Werror -fno-exceptions -fno-rtti)

add_executable(buddy_storage_tests buddy_storage_tests.cpp)
target_link_libraries(buddy_storage_tests PRIVATE buddy_storage)
target_compile_options(buddy_storage_tests PRIVATE -Wall -Wextra -Werror)
add_test(NAME buddy_storage_tests COMMAND buddy_storage_tests)
