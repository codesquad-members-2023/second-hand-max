package com.codesquad.secondhand.adapter.in.web;

import com.codesquad.secondhand.application.port.in.ImageUseCase;
import com.codesquad.secondhand.application.port.in.request.DeleteImageRequest;
import com.codesquad.secondhand.application.port.in.response.ImageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/api/images")
@RestController
public class ImageController {

    private final ImageUseCase imageUseCase;

    @PostMapping
    public ResponseEntity<ImageInfo> upload(@RequestParam MultipartFile file) {
        ImageInfo imageInfo = imageUseCase.upload(file);
        return ResponseEntity.ok()
                .body(imageInfo);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody DeleteImageRequest deleteImageRequest) {
        imageUseCase.delete(deleteImageRequest);
        return ResponseEntity.noContent().build();
    }
}
